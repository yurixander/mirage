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
import {getImageUrl, sendAudioMessage} from "@/utils/util"
import {
  MsgType,
  EventTimeline,
  EventType,
  type Room,
  RoomEvent,
  RoomMemberEvent,
} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import {type MessageSendRequest} from "../ChatInput"
import useValueState, {type ValueState} from "@/hooks/util/useValueState"
import useRoomTimeline from "./useRoomTimeline"

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
  messagesState: ValueState<AnyMessage[]>
  isChatLoading: boolean
  roomName: string
  roomTopic: string
  isRoomEncrypted: boolean
  typingUsers: TypingIndicatorUser[]
  isInputDisabled: boolean
  sendTypingEvent: (roomId: string) => void
  sendMessageText: (messageSendRequest: MessageSendRequest) => void
  onSendAudioMessage: (audioBlob: Blob, roomId: string) => Promise<void>
}

const useRoomChat = (roomId: string): UseRoomChatReturnType => {
  const client = useMatrixClient()
  const {clearActiveRoomId} = useActiveRoomIdStore()

  const [roomName, setRoomName] = useState("")
  const [roomTopic, setRoomTopic] = useState("")
  const [isRoomEncrypted, setIsRoomEncrypted] = useState(false)
  const [isChatLoading, setChatLoading] = useState(true)

  const [typingUsers, setTypingUsers] = useState<TypingIndicatorUser[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

  const messagesState = useRoomTimeline(currentRoom)

  useEffect(() => {
    if (client === null) {
      return
    }

    const room = client.getRoom(roomId)

    if (room === null) {
      clearActiveRoomId()

      return
    }

    setChatLoading(false)

    setCurrentRoom(room)

    // setRoomName(room.name)

    // const roomState = room.getLiveTimeline().getState(EventTimeline.FORWARDS)

    // if (roomState) {
    //   const roomDescription = roomState
    //     .getStateEvents(EventType.RoomTopic, "")
    //     ?.getContent().topic

    //   if (typeof roomDescription === "string") {
    //     setRoomTopic(roomDescription)
    //   } else {
    //     setRoomTopic("")
    //   }

    //   const isEncrypted = roomState.getStateEvents(EventType.RoomEncryption, "")

    //   if (isEncrypted) {
    //     setIsRoomEncrypted(true)
    //   } else {
    //     setIsRoomEncrypted(false)
    //   }
    // }
  }, [clearActiveRoomId, client, roomId])

  // #region Listeners
  useRoomListener(currentRoom, RoomEvent.Name, room => {
    setRoomName(room.name)
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

  const onSendAudioMessage = async (
    audioBlob: Blob,
    roomId: string
  ): Promise<void> => {
    if (client === null) {
      return
    }

    await sendAudioMessage(audioBlob, client, roomId)
  }

  return {
    messagesState,
    isChatLoading,
    roomName,
    roomTopic,
    isRoomEncrypted,
    typingUsers,
    isInputDisabled: client === null,
    onSendAudioMessage,
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
