import {type EventMessageProps} from "@/components/EventMessage"
import {type ImageMessageProps} from "@/components/ImageMessage"
import useConnection from "@/hooks/matrix/useConnection"
import {
  MsgType,
  Room,
  RoomMemberEvent,
  RoomEvent,
  type MatrixClient,
} from "matrix-js-sdk"
import {useCallback, useEffect, useMemo, useState} from "react"
import useEventListener from "./useEventListener"
import {type TypingIndicatorUser} from "@/components/TypingIndicator"
import {
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
import {type ImageModalPreviewProps} from "@/containers/ChatContainer/ChatContainer"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"

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

export enum RoomState {
  Loading,
  Invited,
  Prepared,
  Idle,
  NotFound,
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
  const {client} = useConnection()
  const isMountedReference = useIsMountedRef()

  // Room
  const {activeRoomId, clearActiveRoomId} = useActiveRoomIdStore()
  const [roomName, setRoomName] = useState("")
  const [roomState, setRoomState] = useState(RoomState.Idle)

  // Messages and Typing
  const [messagesProp, setMessagesProp] = useState<AnyMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<TypingIndicatorUser[]>([])
  const [messagesState, setMessagesState] = useState(MessagesState.NotMessages)

  const {openFilePicker, filesContent, clear} = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  })

  // #region Functions
  const fetchRoomMessages = useCallback(
    async (client: MatrixClient, room: Room) => {
      if (!isMountedReference.current) {
        return
      }

      try {
        setMessagesState(MessagesState.Loading)

        const anyMessages = await handleRoomEvents(client, room)

        if (anyMessages.length === 0) {
          setMessagesState(MessagesState.NotMessages)

          return
        }

        setMessagesProp(anyMessages)
        setMessagesState(MessagesState.Loaded)
      } catch (error) {
        // TODO: Handle error fetching messages.
        console.log("Error fetching messages", error)

        setMessagesState(MessagesState.Error)
      }
    },
    [isMountedReference]
  )

  const sendTextMessage = useCallback(
    async (body: string) => {
      if (
        activeRoomId === null ||
        client === null ||
        roomState !== RoomState.Prepared
      ) {
        return
      }

      try {
        await client.sendMessage(activeRoomId, {
          body,
          msgtype: MsgType.Text,
        })
      } catch (error) {
        // TODO: Show toast when an error has occurred.

        console.error("Error sending message:", error)
      }
    },
    [activeRoomId, client, roomState]
  )

  const imagePreviewProps = useMemo(() => {
    if (filesContent.length <= 0) {
      return
    }

    const imageModalPreviewProps: ImageModalPreviewProps = {
      imageName: filesContent[0].name,
      imageUrl: filesContent[0].content,
      onClear: clear,
      onSendImage() {
        void sendImageMessageFromFile(
          filesContent[0],
          client,
          activeRoomId
        ).then(() => {
          clear()
        })
      },
    }

    return imageModalPreviewProps
  }, [activeRoomId, clear, client, filesContent])

  // #region Init useEffect
  useEffect(() => {
    if (
      client === null ||
      activeRoomId === null ||
      !isMountedReference.current
    ) {
      return
    }

    setRoomState(RoomState.Loading)

    const room = client.getRoom(activeRoomId)

    if (room === null) {
      setRoomState(RoomState.NotFound)

      return
    }

    const currentMembership = room.getMyMembership()

    if (
      currentMembership !== KnownMembership.Join &&
      currentMembership !== KnownMembership.Invite
    ) {
      // TODO: Handle other types of memberships.

      setRoomState(RoomState.NotFound)
      clearActiveRoomId()

      return
    }

    setRoomName(room.name)

    const roomState =
      currentMembership === KnownMembership.Invite
        ? RoomState.Invited
        : RoomState.Prepared

    setRoomState(roomState)

    void fetchRoomMessages(client, room)
  }, [
    client,
    activeRoomId,
    isMountedReference,
    fetchRoomMessages,
    clearActiveRoomId,
  ])

  // #region Listeners
  useEventListener(RoomEvent.Timeline, (event, room, _toStartOfTimeline) => {
    if (room === undefined || room.roomId !== activeRoomId || client === null) {
      return
    }

    const isAdminOrModerator = isUserRoomAdmin(room)

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
      setTypingUsers(prevTypingUsers => [
        ...prevTypingUsers,
        {
          displayName: member.name,
          color: stringToColor(member.userId),
          avatarUrl: getImageUrl(member.getMxcAvatarUrl(), client),
        },
      ])
    } else {
      setTypingUsers(prevTypingUsers =>
        prevTypingUsers.filter(user => user.displayName !== member.name)
      )
    }
  })

  useEventListener(RoomMemberEvent.Membership, (_, member) => {
    if (client === null || member.userId !== client.getUserId()) {
      return
    }

    // If you are kicked out of the room, update the UI so that you cannot access the room.
    if (
      member.membership === KnownMembership.Leave ||
      member.membership === KnownMembership.Ban
    ) {
      setRoomState(RoomState.NotFound)

      clearActiveRoomId()
    }
  })

  return {
    client,
    messagesProp,
    sendTextMessage,
    openFilePicker,
    typingUsers,
    roomName,
    roomState,
    messagesState,
    imagePreviewProps,
    activeRoomId,
  }
}

export default useActiveRoom
