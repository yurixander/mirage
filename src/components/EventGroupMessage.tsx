import {useState, type FC} from "react"
import EventMessage, {
  type EventSender,
  type EventMessageData,
} from "./EventMessage"
import Button, {ButtonVariant} from "./Button"
import {motion} from "framer-motion"
import {assert, formatTime, strCapitalize, stringToColor} from "@/utils/util"
import {type IconType} from "react-icons"
import {IoMdCreate} from "react-icons/io"
import {twMerge} from "tailwind-merge"
import Typography from "./Typography"
import {IoCube} from "react-icons/io5"

export enum EventShortenerType {
  EqualInfo = "has done several events.",
  PersonalInfo = "has change his personal info.",
  ConfigureRoom = "has created and configured this room.",
}

export type EventGroupMainBody = {
  sender: EventSender
  shortenerType: EventShortenerType
}

export type EventGroupMessageData = {
  eventGroupMainBody: EventGroupMainBody
  eventMessages: EventMessageData[]
}

export interface EventGroupMessageProps extends EventGroupMessageData {
  onShowMember: () => void
  onFindUser: () => void
}

const EventGroupMessage: FC<EventGroupMessageProps> = ({
  eventGroupMainBody,
  eventMessages,
  onFindUser,
  onShowMember,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  assert(eventMessages.length > 0, "Event group messages should not be empty.")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <EventMessage
          className="grow"
          onShowMember={onShowMember}
          onFindUser={onFindUser}
          body={eventGroupMainBody.shortenerType}
          eventId={eventMessages[0].eventId}
          sender={eventGroupMainBody.sender}
          timestamp={eventMessages[0].timestamp}
          icon={IoCube}
          type={eventGroupMainBody.shortenerType}
        />

        <Button
          variant={ButtonVariant.TextLink}
          label="Expand all"
          onClick={() => {
            setIsExpanded(prevExpanded => !prevExpanded)
          }}
        />
      </div>

      <motion.div
        style={{
          borderLeftColor: stringToColor(eventGroupMainBody.sender.userId),
        }}
        className="mt-1 flex w-full flex-col gap-3 overflow-hidden rounded-md border-l-4 bg-gray-50 pr-24"
        animate={{height: isExpanded ? "max-content" : "0px"}}>
        {eventMessages.map(eventMessageData => (
          <EventMessageChild
            icon={eventMessageData.icon}
            body={eventMessageData.body}
            timestamp={eventMessageData.timestamp}
          />
        ))}
      </motion.div>
    </div>
  )
}

export type EventMEssageChildProps = {
  icon?: IconType
  body: string
  timestamp: number
  className?: string
}

const EventMessageChild: FC<EventMEssageChildProps> = ({
  body,
  icon,
  timestamp,
  className,
}) => {
  const Icon = icon ?? IoMdCreate

  return (
    <div
      className={twMerge(
        "inline-flex items-center gap-4 py-1 pl-10",
        className
      )}>
      <Icon className="text-neutral-300" />

      <Typography className="max-w-text select-text gap-1 whitespace-pre-line break-words italic">
        {strCapitalize(body)}
      </Typography>

      <time className="ml-auto text-gray-300">{formatTime(timestamp)}</time>
    </div>
  )
}

export default EventGroupMessage