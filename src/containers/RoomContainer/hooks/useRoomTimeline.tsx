import useValueState, {type ValueState} from "@/hooks/util/useValueState"
import {MessageKind, type AnyMessage} from "./useRoomChat"
import {RoomEvent, type Room} from "matrix-js-sdk"
import {useCallback, useEffect, useRef} from "react"
import {handleRoomEvents} from "@/utils/rooms"
import useRoomListener from "@/hooks/matrix/useRoomListener"

const useRoomTimeline = (room: Room | null): ValueState<AnyMessage[]> => {
  const roomIdRef = useRef<string | null>(null)
  const [anyMessagesState, setAnyMessagesState] = useValueState<AnyMessage[]>()

  const setMessagesScope = useCallback(
    (roomId: string, execute: () => Promise<AnyMessage[]>) => {
      setAnyMessagesState(prevState => {
        if (prevState.status === "loading") {
          return prevState
        }

        return {status: "loading"}
      })

      execute()
        .then(messages => {
          if (roomIdRef.current !== roomId) {
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

  // useRoomListener(
  //   room,
  //   RoomEvent.Timeline,
  //   (event, room, toStartOfTimeline) => {
  //     if (room === undefined || toStartOfTimeline !== false) {
  //       return
  //     }

  //     const senderId = event.sender?.userId ?? event.getSender()

  //     void handleRoomMessageEvent(event, room).then(messageOrEvent => {
  //       if (messageOrEvent === null) {
  //         return
  //       }

  //       if (room.myUserId === senderId) {
  //         setMessagesState(prevState => {
  //           if (prevState.status !== "success") {
  //             return prevState
  //           }

  //           return {
  //             status: "success",
  //             data: [
  //               ...prevState.data.filter(
  //                 message => message.kind !== MessageKind.Unread
  //               ),
  //               messageOrEvent,
  //             ],
  //           }
  //         })

  //         return
  //       }

  //       setMessagesState(prevState => {
  //         if (prevState.status !== "success") {
  //           return prevState
  //         }

  //         return {
  //           status: "success",
  //           data: [...prevState.data, messageOrEvent],
  //         }
  //       })

  //       void room.client.sendReadReceipt(event)
  //     })
  //   }
  // )

  return anyMessagesState
}

export default useRoomTimeline
