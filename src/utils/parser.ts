import {
  EventGroupMessageData,
  EventShortenerType,
} from "@/components/EventGroupMessage"
import {EventMessageData} from "@/components/EventMessage"
import {
  AnyMessage,
  MessageKind,
} from "@/containers/RoomContainer/hooks/useRoomChat"
import {EventType} from "matrix-js-sdk"

export type ReplyMessageBodyData = {
  message: string
  quotedMessage: string
  quotedUser: string
}

export const parseReplyMessageFromBody = (
  body: string
): ReplyMessageBodyData => {
  const message = body.slice(body.indexOf("\n\n") + 2)

  const match = body.split(/\n{2}/)[0]

  const quotedMessage = match.slice(match.indexOf(">", match.indexOf("<")) + 1)

  let quotedUser = match.slice(
    match.indexOf("<") + 1,
    match.indexOf(">", match.indexOf("<"))
  )

  if (quotedUser.indexOf("@") === 0 && quotedUser.includes(":")) {
    quotedUser = quotedUser.slice(1, quotedUser.indexOf(":"))
  }

  return {
    message,
    quotedMessage,
    quotedUser,
  }
}

export const validateReplyMessage = (body: string): boolean => {
  return !(
    !body.includes("\n\n") ||
    !body.includes("<") ||
    !body.includes(">") ||
    body.indexOf(">") > 0
  )
}

// #region Grouping Methods

const CONFIG_ROOM_PATTERN = new Set<string>([
  EventType.RoomTopic,
  EventType.RoomAvatar,
  EventType.RoomName,
  EventType.RoomEncryption,
  EventType.RoomCanonicalAlias,
  EventType.RoomGuestAccess,
  EventType.RoomJoinRules,
  EventType.RoomHistoryVisibility,
  EventType.RoomCreate,
  EventType.RoomJoinRules,
])

const processPatterns = (
  lastMessage: EventMessageData,
  currentMessage: EventMessageData
): AnyMessage | null => {
  if (lastMessage.sender.userId !== currentMessage.sender.userId) {
    return null
  }

  if (
    CONFIG_ROOM_PATTERN.has(lastMessage.type) &&
    CONFIG_ROOM_PATTERN.has(currentMessage.type)
  ) {
    return {
      kind: MessageKind.EventGroup,
      messageId: lastMessage.eventId,
      data: {
        eventMessages: [lastMessage, currentMessage],
        eventGroupMainBody: {
          sender: lastMessage.sender,
          shortenerType: EventShortenerType.ConfigureRoom,
        },
      },
    }
    return null
  }

  return {
    kind: MessageKind.EventGroup,
    messageId: lastMessage.eventId,
    data: {
      eventMessages: [lastMessage, currentMessage],
      eventGroupMainBody: {
        sender: lastMessage.sender,
        shortenerType: EventShortenerType.EqualInfo,
      },
    },
  }
}

const updateEventGroup = (
  eventGroup: EventGroupMessageData,
  newEvent: EventMessageData
): AnyMessage | null => {
  if (eventGroup.eventGroupMainBody.sender.userId !== newEvent.sender.userId) {
    return null
  }

  const partialMessage: AnyMessage = {
    kind: MessageKind.EventGroup,
    messageId: newEvent.eventId,
    data: {
      eventMessages: [...eventGroup.eventMessages, newEvent],
      eventGroupMainBody: eventGroup.eventGroupMainBody,
    },
  }

  switch (eventGroup.eventGroupMainBody.shortenerType) {
    case EventShortenerType.EqualInfo: {
      if (CONFIG_ROOM_PATTERN.has(newEvent.type)) {
        return null
      }

      return partialMessage
    }
    case EventShortenerType.PersonalInfo: {
      throw new Error(
        "Not implemented yet: EventShortenerType.PersonalInfo case"
      )
    }
    case EventShortenerType.ConfigureRoom: {
      if (!CONFIG_ROOM_PATTERN.has(newEvent.type)) {
        return null
      }

      return partialMessage
    }
  }
}

export const groupEventMessage = (anyMessages: AnyMessage[]): AnyMessage[] => {
  const result: AnyMessage[] = []

  for (const message of anyMessages) {
    const lastMessage = result.at(-1)

    if (lastMessage === undefined) {
      result.push(message)

      continue
    }

    const isLastMessageEvent = lastMessage.kind === MessageKind.Event
    const isMessageEvent = message.kind === MessageKind.Event

    if (isLastMessageEvent && isMessageEvent) {
      const newEventGroup = processPatterns(lastMessage.data, message.data)

      if (newEventGroup === null) {
        result.push(message)

        continue
      }

      result[result.length - 1] = newEventGroup
    } else if (lastMessage.kind === MessageKind.EventGroup && isMessageEvent) {
      const eventGroupUpdated = updateEventGroup(lastMessage.data, message.data)

      if (eventGroupUpdated === null) {
        result.push(message)

        continue
      }

      result[result.length - 1] = eventGroupUpdated
    } else {
      result.push(message)
    }
  }

  return result
}
