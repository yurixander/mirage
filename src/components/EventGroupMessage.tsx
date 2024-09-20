import {useState, type FC} from "react"
import EventMessage, {
  type EventSender,
  type EventMessageData,
  MAX_EVENT_BODY_LENGTH,
  MAX_EVENT_SENDER_NAME_LENGTH,
} from "./EventMessage"
import {motion} from "framer-motion"
import {formatTime, strCapitalize, stringToColor, trim} from "@/utils/util"
import {type IconType} from "react-icons"
import {IoMdCreate} from "react-icons/io"
import {twMerge} from "tailwind-merge"
import Typography from "./Typography"
import {IoChevronDown, IoCube} from "react-icons/io5"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Button} from "./ui/button"

export enum EventShortenerType {
  EqualInfo = "EqualInfo",
  PersonalInfo = "PersonalInfo",
  ConfigureRoom = "Configure Room",
}

const eventShortenerBody: Record<EventShortenerType, LangKey> = {
  [EventShortenerType.EqualInfo]: LangKey.EqualInfo,
  [EventShortenerType.PersonalInfo]: LangKey.PersonalInfo,
  [EventShortenerType.ConfigureRoom]: LangKey.ConfigureRoom,
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
  const {sender, shortenerType} = eventGroupMainBody
  const [isExpanded, setIsExpanded] = useState(false)
  const {t} = useTranslation()

  const accessibilityText = isExpanded
    ? t(LangKey.CollapseEvents)
    : t(LangKey.ExpandEvents)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between gap-1">
        <EventMessage
          className="grow"
          onShowMember={onShowMember}
          onFindUser={onFindUser}
          body={t(eventShortenerBody[shortenerType])}
          eventId={eventMessages[0].eventId}
          sender={sender}
          timestamp={eventMessages[0].timestamp}
          icon={IoCube}
          type={shortenerType}
        />

        <Button
          className="size-7"
          aria-label={accessibilityText}
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsExpanded(prevExpanded => !prevExpanded)
          }}>
          <motion.div
            aria-hidden
            animate={{
              rotate: isExpanded ? 180 : 0,
            }}
            transition={{
              duration: 0.2,
            }}>
            <IoChevronDown aria-hidden className="size-5" />
          </motion.div>
        </Button>
      </div>

      <motion.div
        animate={{height: isExpanded ? "max-content" : "0px"}}
        className="overflow-hidden pl-6 pr-7">
        <div
          className="flex w-full flex-col gap-3 rounded-md border border-l-4 bg-gray-50 p-2"
          style={{
            borderColor: stringToColor(sender.userId),
          }}>
          {eventMessages.map(eventMessageData => (
            <EventMessageChild
              key={eventMessageData.eventId}
              icon={eventMessageData.icon}
              body={eventMessageData.body}
              timestamp={eventMessageData.timestamp}
              accessibilityText={t(
                LangKey.EventBodyWithTime,
                eventMessageData.body,
                formatTime(eventMessageData.timestamp)
              )}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export type EventMessageChildProps = {
  icon?: IconType
  body: string
  timestamp: number
  accessibilityText: string
  className?: string
}

const MAX_CHILD_EVENT_BODY_LENGTH =
  MAX_EVENT_BODY_LENGTH + MAX_EVENT_SENDER_NAME_LENGTH

const EventMessageChild: FC<EventMessageChildProps> = ({
  body,
  icon,
  timestamp,
  accessibilityText,
  className,
}) => {
  const Icon = icon ?? IoMdCreate

  return (
    <div
      role="article"
      aria-label={accessibilityText}
      className={twMerge("flex items-center px-1", className)}>
      <div className="inline-flex gap-1">
        <Icon aria-hidden className="mt-1 text-gray-500" />

        <Typography
          ariaHidden
          className="whitespace-pre-line break-words italic text-gray-500">
          {trim(strCapitalize(body), MAX_CHILD_EVENT_BODY_LENGTH)}
        </Typography>
      </div>

      <time className="ml-auto text-gray-400">{formatTime(timestamp)}</time>
    </div>
  )
}

export default EventGroupMessage
