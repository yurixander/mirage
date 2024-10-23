import {type FC} from "react"
import EventMessage, {
  type EventSender,
  type EventMessageData,
  MAX_EVENT_BODY_LENGTH,
  MAX_EVENT_SENDER_NAME_LENGTH,
} from "./EventMessage"
import {formatTime, strCapitalize, trim} from "@/utils/util"
import {type IconType} from "react-icons"
import {IoMdCreate} from "react-icons/io"
import {twMerge} from "tailwind-merge"
import {IoCube} from "react-icons/io5"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {Text} from "./ui/typography"

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
  const {t} = useTranslation()

  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="border-none" value={eventMessages[0].eventId}>
        <AccordionTrigger className="items-start py-0 hover:no-underline focus-visible:ring-1 focus-visible:ring-ring">
          <EventMessage
            className="pr-1 sm:pr-2"
            onShowMember={onShowMember}
            onFindUser={onFindUser}
            body={t(eventShortenerBody[shortenerType])}
            eventId={eventMessages[0].eventId}
            sender={sender}
            timestamp={eventMessages[0].timestamp}
            icon={IoCube}
            type={shortenerType}
          />
        </AccordionTrigger>

        <AccordionContent className="overflow-hidden px-3.5">
          <div className="flex w-full flex-col gap-3 p-2">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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

export const EventMessageChild: FC<EventMessageChildProps> = ({
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
      <div className="inline-flex gap-2">
        <Icon aria-hidden className="mt-1 fill-neutral-500" />

        <Text className="whitespace-pre-line break-words italic">
          {trim(strCapitalize(body), MAX_CHILD_EVENT_BODY_LENGTH)}
        </Text>
      </div>

      <time className="ml-auto text-base font-normal">
        {formatTime(timestamp)}
      </time>
    </div>
  )
}

export default EventGroupMessage
