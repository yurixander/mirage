import {type AudioMessageData} from "@/components/AudioMessage"
import {type EventGroupMessageData} from "@/components/EventGroupMessage"
import {type EventMessageData} from "@/components/EventMessage"
import {type FileMessageData} from "@/components/FileMessage"
import {type ImageMessageData} from "@/components/ImageMessage"
import {type ReplyMessageData} from "@/components/ReplyMessage"
import {type TextMessageData} from "@/components/TextMessage"
import {type TypingIndicatorUser} from "@/components/TypingIndicator"
import {type UnreadIndicatorProps} from "@/components/UnreadIndicator"
import {type VideoMessageData} from "@/components/VideoMessage"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useEventListener from "@/hooks/matrix/useEventListener"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useRoomListener from "@/hooks/matrix/useRoomListener"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {handleRoomMessageEvent, handleRoomEvents} from "@/utils/rooms"
import {getImageUrl} from "@/utils/util"
import {MsgType, type Room, RoomEvent, RoomMemberEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import {type MessageSendRequest} from "../ChatInput"

export enum MessageKind {
  Text,
  Image,
  Audio,
  Event,
  File,
  Reply,
  EventGroup,
  Video,
  Unread,
}

export enum MessagesState {
  Loading,
  Loaded,
  NotMessages,
  Error,
}

export type MessageOf<Kind extends MessageKind> = Kind extends MessageKind.Text
  ? TextMessageData
  : Kind extends MessageKind.Image
    ? ImageMessageData
    : Kind extends MessageKind.Event
      ? EventMessageData
      : Kind extends MessageKind.File
        ? FileMessageData
        : Kind extends MessageKind.Audio
          ? AudioMessageData
          : Kind extends MessageKind.Audio
            ? AudioMessageData
            : Kind extends MessageKind.Reply
              ? ReplyMessageData
              : Kind extends MessageKind.EventGroup
                ? EventGroupMessageData
                : Kind extends MessageKind.Video
                  ? VideoMessageData
                  : UnreadIndicatorProps

export type Message<Kind extends MessageKind> = {
  kind: Kind
  data: MessageOf<Kind>
}

export type AnyMessage =
  | Message<MessageKind.Text>
  | Message<MessageKind.Image>
  | Message<MessageKind.Event>
  | Message<MessageKind.File>
  | Message<MessageKind.Video>
  | Message<MessageKind.Unread>
  | Message<MessageKind.Audio>
  | Message<MessageKind.Reply>
  | Message<MessageKind.EventGroup>

type UseRoomChatReturnType = {
  messagesState: MessagesState
  isChatLoading: boolean
  roomName: string
  messages: AnyMessage[]
  typingUsers: TypingIndicatorUser[]
  isInputDisabled: boolean
  sendTypingEvent: (roomId: string) => void
  sendMessageText: (messageSendRequest: MessageSendRequest) => void
}

const useRoomChat = (roomId: string): UseRoomChatReturnType => {
  const client = useMatrixClient()
  const isMountedReference = useIsMountedRef()
  const {clearActiveRoomId} = useActiveRoomIdStore()

  const [roomName, setRoomName] = useState("")
  const [isChatLoading, setChatLoading] = useState(true)
  const [messagesState, setMessagesState] = useState(MessagesState.NotMessages)

  const [messages, setMessages] = useState<AnyMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<TypingIndicatorUser[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

  const fetchRoomMessages = useCallback(async (room: Room) => {
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
      console.error("Error fetching messages", error)

      setMessagesState(MessagesState.Error)
    }
  }, [])

  useEffect(() => {
    if (client === null || !isMountedReference.current) {
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
  }, [clearActiveRoomId, client, fetchRoomMessages, isMountedReference, roomId])

  // #region Listeners
  useRoomListener(currentRoom, RoomEvent.Name, room => {
    setRoomName(room.name)
  })

  useRoomListener(
    currentRoom,
    RoomEvent.Timeline,
    (event, room, toStartOfTimeline) => {
      if (room === undefined || toStartOfTimeline !== false) {
        return
      }

      void handleRoomMessageEvent(event, room).then(messageOrEvent => {
        if (messageOrEvent === null) {
          return
        }

        setMessages(messages => [...messages, messageOrEvent])
        void room.client.sendReadReceipt(event)
      })
    }
  )

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

  return {
    messagesState,
    isChatLoading,
    roomName,
    messages,
    typingUsers,
    isInputDisabled: client === null,
    sendMessageText({messageText, roomId}) {
      if (client === null || messageText.length === 0) {
        return
      }

      void client.sendMessage(roomId, {
        body: messageText,
        msgtype: MsgType.Text,
      })
    },
    sendTypingEvent(roomId) {
      if (client === null) {
        return
      }

      void client.sendTyping(roomId, true, 2000)
    },
  }
}

export default useRoomChat
