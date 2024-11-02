import useValueState, {type ValueState} from "@/hooks/util/useValueState"
import {MessageKind, type AnyMessage} from "./useRoomChat"
import {RoomEvent, type Room} from "matrix-js-sdk"
import {useCallback, useEffect, useRef} from "react"
import {handleRoomEvents, handleRoomMessageEvent} from "@/utils/rooms"
import useRoomListener from "@/hooks/matrix/useRoomListener"

const useRoomTimeline = (
  room: Room | null
): [ValueState<AnyMessage[]>, () => void] => {
  const roomIdRef = useRef<string | null>(null)
  const [anyMessagesState, setAnyMessagesState] = useValueState<AnyMessage[]>()

  const setMessagesScope = useCallback(
    (
      roomId: string,
      execute: () => Promise<AnyMessage[] | null>,
      useLoading: boolean = true
    ) => {
      setAnyMessagesState(prevState => {
        if (prevState.status === "loading" || !useLoading) {
          return prevState
        }

        return {status: "loading"}
      })

      execute()
        .then(messages => {
          if (roomIdRef.current !== roomId || messages === null) {
            return
          }

          setAnyMessagesState({status: "success", data: messages})
        })
        .catch((error: Error) => {
          setAnyMessagesState({status: "error", error})
        })
    },
    [setAnyMessagesState]
  )

  // Keep correct roomId ref.
  useEffect(() => {
    roomIdRef.current = room?.roomId ?? null
  }, [room])

  // Initial messages fetching.
  useEffect(() => {
    if (room === null) {
      return
    }

    setMessagesScope(room.roomId, async () => await handleRoomEvents(room))
  }, [room, setMessagesScope])

  // Remove the unread indicator after 10 seconds have passed.
  useEffect(() => {
    if (anyMessagesState.status !== "success") {
      return
    }

    const handler = setTimeout(() => {
      setAnyMessagesState(prevState => {
        if (prevState.status !== "success") {
          return prevState
        }

        return {
          status: "success",
          data: prevState.data.filter(
            message => message.kind !== MessageKind.Unread
          ),
        }
      })
    }, 10_000)

    return () => {
      clearTimeout(handler)
    }
  }, [anyMessagesState.status, setAnyMessagesState])

  // When someone deletes a message.
  useRoomListener(room, RoomEvent.Redaction, (event, room) => {
    if (room === undefined) {
      return
    }

    const eventContent = event.getContent()

    if (eventContent.msgtype !== undefined) {
      return
    }

    // TODO: Optimize this, not reload all messages when process one message.
    // void fetchRoomMessages(room)
    void room.client.sendReadReceipt(event)
  })

  useRoomListener(
    room,
    RoomEvent.Timeline,
    (event, room, toStartOfTimeline) => {
      if (
        room === undefined ||
        toStartOfTimeline !== false ||
        anyMessagesState.status !== "success"
      ) {
        return
      }

      const senderId = event.sender?.userId ?? event.getSender()

      setMessagesScope(
        room.roomId,
        async () => {
          const messageResult = await handleRoomMessageEvent(event, room)

          if (messageResult === null) {
            return null
          }

          await room.client.sendReadReceipt(event)

          if (room.myUserId === senderId) {
            const messagesRead = anyMessagesState.data.filter(
              message => message.kind !== MessageKind.Unread
            )

            return [...messagesRead, messageResult]
          }

          return anyMessagesState.data.concat([messageResult])
        },
        false
      )
    }
  )

  return [
    anyMessagesState,
    () => {
      if (room === null) {
        return
      }

      setMessagesScope(room.roomId, async () => await handleRoomEvents(room))
    },
  ]
}

export default useRoomTimeline
