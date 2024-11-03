import useValueState, {type ValueState} from "@/hooks/util/useValueState"
import {type AnyMessage} from "./useRoomChat"
import {RoomEvent, type Room} from "matrix-js-sdk"
import {useCallback, useEffect, useRef, useState} from "react"
import {handleRoomEvents, handleRoomMessageEvent} from "@/utils/rooms"
import useRoomListener from "@/hooks/matrix/useRoomListener"

type UseRoomTimelineReturnType = {
  messagesState: ValueState<AnyMessage[]>
  lastMessageReadId: string | null
  onLastMessageReadIdChange: (messageId: string | null) => void
  reloadMessages: () => void
}

const useRoomTimeline = (room: Room | null): UseRoomTimelineReturnType => {
  const roomIdRef = useRef<string | null>(null)
  const [anyMessagesState, setAnyMessagesState] = useValueState<AnyMessage[]>()

  const [lastMessageReadId, setLastReadMessageId] = useState<string | null>(
    null
  )

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
      setLastReadMessageId(null)

      return
    }

    const lastReadMessageId = room.getEventReadUpTo(room.myUserId)

    setMessagesScope(room.roomId, async () => await handleRoomEvents(room))
    setLastReadMessageId(lastReadMessageId)
  }, [room, setMessagesScope])

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
    setMessagesScope(
      room.roomId,
      async () => await handleRoomEvents(room),
      false
    )

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

      if (senderId === room.myUserId) {
        setLastReadMessageId(null)
      }

      setMessagesScope(
        room.roomId,
        async () => {
          const messageResult = await handleRoomMessageEvent(event, room)

          if (messageResult === null) {
            return null
          }

          await room.client.sendReadReceipt(event)

          return anyMessagesState.data.concat([messageResult])
        },
        false
      )
    }
  )

  return {
    messagesState: anyMessagesState,
    lastMessageReadId,
    onLastMessageReadIdChange: setLastReadMessageId,
    reloadMessages() {
      if (room === null) {
        return
      }

      const lastReadMessageId = room.getEventReadUpTo(room.myUserId)

      setMessagesScope(room.roomId, async () => await handleRoomEvents(room))
      setLastReadMessageId(lastReadMessageId)
    },
  }
}

export default useRoomTimeline
