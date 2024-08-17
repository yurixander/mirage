import {type FC} from "react"
import {assert, formatTime, stringToColor} from "../utils/util"
import {IoMdCreate} from "react-icons/io"
import Typography from "./Typography"
import ContextMenu, {ClickActions} from "./ContextMenu"
import {IoPeopleCircle, IoSearchCircle} from "react-icons/io5"
import {type IconType} from "react-icons"
import {type EventType} from "matrix-js-sdk"

export type EventSender = {
  displayName: string
  userId: string
}

export type EventMessageData = {
  eventId: string
  sender: EventSender
  body: string
  timestamp: number
  type: EventType | string
  icon?: IconType
}

export interface EventMessageProps extends EventMessageData {
  onShowMember: () => void
  onFindUser: () => void
}

const EventMessage: FC<EventMessageProps> = ({
  timestamp,
  body,
  sender,
  eventId,
  icon,
  onFindUser,
  onShowMember,
}) => {
  const Icon = icon ?? IoMdCreate

  assert(eventId.length > 0, "Event id should not be empty.")
  assert(sender.userId.length > 0, "Sender user id should not be empty.")
  assert(body.length > 0, "Event message body should not be empty.")

  assert(
    sender.displayName.length > 0,
    "Sender display name should not be empty."
  )

  return (
    <div className="flex items-center gap-3">
      <Typography className="inline-flex max-w-text select-text gap-1 whitespace-pre-line break-words italic">
        <ContextMenu
          className="shrink-0"
          id={`context-menu-event-${eventId}`}
          actionType={ClickActions.LeftClick}
          elements={[
            {
              icon: IoPeopleCircle,
              onClick: onShowMember,
              text: "View member",
            },
            {
              icon: IoSearchCircle,
              onClick: onFindUser,
              text: "Find user",
            },
          ]}>
          <Typography
            className="inline-flex items-center gap-2 font-bold"
            style={{color: stringToColor(sender.userId)}}>
            <div className="flex w-10 justify-end">
              <Icon className="text-neutral-300" />
            </div>

            {sender.displayName}
          </Typography>
        </ContextMenu>
        {body}
      </Typography>

      <time className="ml-auto text-gray-300">{formatTime(timestamp)}</time>
    </div>
  )
}

export default EventMessage
