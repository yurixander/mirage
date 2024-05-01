import {type EventMessageProps} from "@/components/EventMessage"
import {type ImageMessageProps} from "@/components/ImageMessage"
import useConnection from "@/hooks/matrix/useConnection"
import {MsgType, RoomMemberEvent, RoomEvent} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import useEventListener from "./useEventListener"
import {type TypingIndicatorUser} from "@/components/TypingIndicator"
import {
  deleteMessage,
  getImageUrl,
  sendImageMessageFromFile,
  stringToColor,
} from "@/utils/util"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useIsMountedRef from "@/hooks/util/useIsMountedRef"
import {type MessageBaseProps} from "@/components/MessageContainer"
import {type UnreadIndicatorProps} from "@/components/UnreadIndicator"
import {useFilePicker} from "use-file-picker"
import {isUserRoomAdmin} from "@/utils/members"
import {handleEvents, handleRoomEvents} from "@/utils/rooms"

export enum MessageKind {
  Text,
  Image,
  Event,
  Unread,
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

const useActiveRoom = () => {
  const {activeRoomId} = useActiveRoomIdStore()
  const {client} = useConnection()
  const [messagesProp, setMessagesProp] = useState<AnyMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<TypingIndicatorUser[]>([])
  const isMountedReference = useIsMountedRef()
  const [roomName, setRoomName] = useState<string>(" ")
  const [isLoadingMessages, setIsMessagesLoading] = useState(false)

  const {openFilePicker, filesContent, clear} = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  })

  useEffect(() => {
    if (
      client === null ||
      activeRoomId === null ||
      !isMountedReference.current
    ) {
      return
    }

    const room = client.getRoom(activeRoomId)

    setIsMessagesLoading(true)

    void client.getRoomSummary(activeRoomId).then(roomSummary => {
      if (roomSummary.name === undefined) {
        return
      }

      setRoomName(roomSummary.name)
    })

    if (room === null) {
      throw new Error(`Room with ID ${activeRoomId} does not exist`)
    }

    void handleRoomEvents(client, room).then(newMessages => {
      if (isMountedReference.current) {
        setMessagesProp(newMessages)
        setIsMessagesLoading(false)
      }
    })
  }, [client, activeRoomId, isMountedReference])

  useEventListener(RoomEvent.Timeline, (event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId !== activeRoomId || client === null) {
      return
    }

    const isAdminOrModerator = isUserRoomAdmin(room, client)

    void handleEvents(client, event, room.roomId, isAdminOrModerator).then(
      messageOrEvent => {
        if (messageOrEvent === null) {
          return
        }

        setMessagesProp(messages => [...messages, messageOrEvent])
        void client.sendReadReceipt(event)
      }
    )
  })

  useEventListener(RoomEvent.Redaction, (event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId !== activeRoomId || client === null) {
      return
    }

    const eventContent = event.getContent()

    if (eventContent.msgtype !== undefined) {
      return
    }

    void handleRoomEvents(client, room).then(messagesOrEvents => {
      if (messagesOrEvents === null) {
        return
      }

      setMessagesProp(messagesOrEvents)
      void client.sendReadReceipt(event)
    })
  })

  // When users begin typing, add them to the list of typing users.
  useEventListener(RoomMemberEvent.Typing, (_event, member) => {
    const userId = client?.getUserId()

    if (member.userId === userId || member.roomId !== activeRoomId) {
      return
    }

    if (member.typing) {
      setTypingUsers(typingUsers => [
        ...typingUsers,
        {
          displayName: member.name,
          color: stringToColor(member.userId),
          avatarUrl: getImageUrl(member.getMxcAvatarUrl(), client),
        },
      ])
    } else {
      setTypingUsers(typingUsers =>
        typingUsers.filter(user => user.displayName !== member.name)
      )
    }
  })

  const sendImageMessage = useCallback(async () => {
    await sendImageMessageFromFile(filesContent[0], client, activeRoomId)
    clear()
  }, [activeRoomId, clear, client, filesContent])

  const sendTextMessage = useCallback(
    async (body: string) => {
      if (activeRoomId === null || client === null) {
        return
      }

      // TODO: Show toast when an error has occurred.
      await client.sendMessage(activeRoomId, {
        body,
        msgtype: MsgType.Text,
      })
    },
    [activeRoomId, client]
  )

  const sendEventTyping = useCallback(async () => {
    if (activeRoomId === null || client === null) {
      return
    }

    await client.sendTyping(activeRoomId, true, 2000)
  }, [activeRoomId, client])

  return {
    activeRoomId,
    messagesProp,
    sendTextMessage,
    sendImageMessage,
    openFilePicker,
    typingUsers,
    sendEventTyping,
    client,
    deleteMessage,
    roomName,
    filesContent,
    clear,
    isLoadingMessages,
  }
}

export default useActiveRoom
