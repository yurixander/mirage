import {type EventMessageProps} from "@/components/EventMessage"
import {type ImageMessageProps} from "@/components/ImageMessage"
import {type MessageBaseProps} from "@/components/MessageContainer"
import {type TypingIndicatorUser} from "@/components/TypingIndicator"
import {type UnreadIndicatorProps} from "@/components/UnreadIndicator"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useConnection from "@/hooks/matrix/useConnection"
import useEventListener from "@/hooks/matrix/useEventListener"
import useRoomListener from "@/hooks/matrix/useRoomListener"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {isCurrentUserAdminOrMod} from "@/utils/members"
import {handleEvent, handleRoomEvents} from "@/utils/rooms"
import {getImageUrl} from "@/utils/util"
import {type Room, RoomEvent, RoomMemberEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"

export enum MessageKind {
  Text,
  Image,
  Event,
  Unread,
}

export enum MessagesState {
  Loading,
  Loaded,
  NotMessages,
  Error,
}

export type MessageOf<Kind extends MessageKind> = Kind extends MessageKind.Text
  ? MessageBaseProps
  : Kind extends MessageKind.Image
    ? ImageMessageProps
    : Kind extends MessageKind.Event
      ? EventMessageProps
      : UnreadIndicatorProps

export type Message<Kind extends MessageKind> = {
  kind: Kind
  data: MessageOf<Kind>
}

export type AnyMessage =
  | Message<MessageKind.Text>
  | Message<MessageKind.Image>
  | Message<MessageKind.Event>
  | Message<MessageKind.Unread>

type UseRoomChatReturnType = {
  messagesState: MessagesState
  isChatLoading: boolean
  roomName: string
  messages: AnyMessage[]
  typingUsers: TypingIndicatorUser[]
}

const useRoomChat = (roomId: string): UseRoomChatReturnType => {
  const {client} = useConnection()
  const isMountedReference = useIsMountedRef()
  const {clearActiveRoomId} = useActiveRoomIdStore()
  const [roomName, setRoomName] = useState("")
  const [isChatLoading, setChatLoading] = useState(true)
  const [messagesState, setMessagesState] = useState(MessagesState.NotMessages)
  const [messages, setMessages] = useState<AnyMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<TypingIndicatorUser[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

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
    setChatLoading(false)

    void fetchRoomMessages(room)

    setCurrentRoom(room)
  }, [clearActiveRoomId, client, fetchRoomMessages, roomId])

  // #region Listeners
  useRoomListener(currentRoom, RoomEvent.Name, room => {
    setRoomName(room.name)
  })

  useRoomListener(currentRoom, RoomEvent.Timeline, (event, room) => {
    if (room === undefined) {
      return
    }

    const isAdminOrModerator = isCurrentUserAdminOrMod(room)

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

  // When someone deletes a message.
  useRoomListener(currentRoom, RoomEvent.Redaction, (event, room) => {
    if (room === undefined) {
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

  useEventListener(RoomMemberEvent.Typing, (_event, member) => {
    const currentUserId = client?.getUserId()

    if (member.userId === currentUserId || member.roomId !== roomId) {
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

      return
    }

    // Remove user from typing users list if they stopped typing.
    setTypingUsers(prevTypingUsers =>
      prevTypingUsers.filter(user => user.userId !== member.userId)
    )
  })

  return {messagesState, isChatLoading, roomName, messages, typingUsers}
}

export default useRoomChat
