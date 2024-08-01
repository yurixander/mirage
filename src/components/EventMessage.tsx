import {type FC} from "react"
import {formatTime, stringToColor} from "../utils/util"
import {IoMdCreate} from "react-icons/io"
import Typography from "./Typography"
import ContextMenu, {ClickActions} from "./ContextMenu"
import {IoPeopleCircle, IoSearchCircle} from "react-icons/io5"
import {type IconType} from "react-icons"

export type EventSender = {
  displayName: string
  userId: string
}

export type EventMessagePropsCommon = {
  eventId: string
  sender: EventSender
  timestamp: number
}

export type EventMessageData = {
  eventId: string
  sender: EventSender
  body: string
  timestamp: number
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

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-10 items-center justify-end">
        <Icon className="text-neutral-200" />
      </div>

      <Typography className="flex max-w-messageMaxWidth select-text items-center gap-1 whitespace-pre-line break-words italic">
        <ContextMenu
          id={`context-menu-event-${eventId}`}
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
          ]}
          actionType={ClickActions.LeftClick}>
          <Typography style={{color: stringToColor(sender.userId)}}>
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
