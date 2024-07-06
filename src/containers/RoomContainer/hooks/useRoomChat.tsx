import {type TypingIndicatorUser} from "@/components/TypingIndicator"
import {type AnyMessage, MessagesState} from "@/hooks/matrix/useActiveRoom"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useConnection from "@/hooks/matrix/useConnection"
import useEventListener from "@/hooks/matrix/useEventListener"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {isUserRoomAdmin} from "@/utils/members"
import {handleEvent, handleRoomEvents} from "@/utils/rooms"
import {getImageUrl} from "@/utils/util"
import {RoomEvent, RoomMemberEvent, type Room} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"

const useRoomChat = (roomId: string) => {
  const {client} = useConnection()
  const isMountedReference = useIsMountedRef()
  const {clearActiveRoomId} = useActiveRoomIdStore()
  const [roomName, setRoomName] = useState("")
  const [isChatLoading, setChatLoading] = useState(true)
  const [messagesState, setMessagesState] = useState(MessagesState.NotMessages)
  const [messages, setMessages] = useState<AnyMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<TypingIndicatorUser[]>([])

  const fetchRoomMessages = useCallback(
    async (room: Room) => {
      if (!isMountedReference.current) {
        return
      }

      try {
        setMessagesState(MessagesState.Loading)

        const anyMessages = await handleRoomEvents(room)

        if (anyMessages.length === 0) {
          setMessagesState(MessagesState.NotMessages)

          return
        }

        setMessages(anyMessages)
        setMessagesState(MessagesState.Loaded)
      } catch (error) {
        // TODO: Handle error fetching messages.
        console.log("Error fetching messages", error)

        setMessagesState(MessagesState.Error)
      }
    },
    [isMountedReference]
  )

  useEffect(() => {
    if (client === null) {
      return
    }

    const room = client.getRoom(roomId)

    if (room === null) {
      clearActiveRoomId()

      return
    }

    setRoomName(room.name)

    // Fetch messages ect...

    setChatLoading(false)

    void fetchRoomMessages(room)
  }, [clearActiveRoomId, client, fetchRoomMessages, roomId])

  // TODO: Handle listeners for room name ect...

  useEventListener(RoomEvent.Name, room => {
    setRoomName(room.name)
  })

  // #region Listeners
  useEventListener(RoomEvent.Timeline, (event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId !== roomId) {
      return
    }

    // TODO: Optimize this with changes from https://github.com/yurixander/mirage/pull/57
    const isAdminOrModerator = isUserRoomAdmin(room)

    void handleEvent(room.client, event, room.roomId, isAdminOrModerator).then(
      messageOrEvent => {
        if (messageOrEvent === null) {
          return
        }

        setMessages(messages => [...messages, messageOrEvent])
        void room.client.sendReadReceipt(event)
      }
    )
  })

  useEventListener(RoomEvent.Redaction, (event, room) => {
    if (room === undefined || room.roomId !== roomId) {
      return
    }

    const eventContent = event.getContent()

    if (eventContent.msgtype !== undefined) {
      return
    }

    // TODO: Optimize this, not reload all messages when process one message.
    void fetchRoomMessages(room)
    void room.client.sendReadReceipt(event)
  })

  // When users begin typing, add them to the list of typing users.
  useEventListener(RoomMemberEvent.Typing, (_event, member) => {
    const userId = client?.getUserId()

    if (member.userId === userId || member.roomId !== roomId) {
      return
    }

    if (member.typing) {
      setTypingUsers(prevTypingUsers => [
        ...prevTypingUsers,
        {
          displayName: member.name,
          userId: member.userId,
          avatarUrl: getImageUrl(member.getMxcAvatarUrl(), client),
        },
      ])
    } else {
      setTypingUsers(prevTypingUsers =>
        prevTypingUsers.filter(user => user.userId !== member.userId)
      )
    }
  })

  return {messagesState, isChatLoading, roomName, messages, typingUsers}
}

export default useRoomChat
