import {type FC} from "react"
import {assert, formatTime, stringToColor, trim} from "../utils/util"
import {IoMdCreate} from "react-icons/io"
import Typography from "./Typography"
import {IoPeopleCircle, IoSearchCircle} from "react-icons/io5"
import {type IconType} from "react-icons"
import {type EventType} from "matrix-js-sdk"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {twMerge} from "tailwind-merge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItemGenerator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

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

export const MAX_EVENT_BODY_LENGTH = 70
export const MAX_EVENT_SENDER_NAME_LENGTH = 32

export interface EventMessageProps extends EventMessageData {
  onShowMember: () => void
  onFindUser: () => void
  className?: string
}

const EventMessage: FC<EventMessageProps> = ({
  timestamp,
  body,
  sender,
  eventId,
  icon,
  onFindUser,
  onShowMember,
  className,
}) => {
  const Icon = icon ?? IoMdCreate
  const {t} = useTranslation()
  const accentColor = stringToColor(sender.userId)

  assert(eventId.length > 0, "Event id should not be empty.")

  return (
    <div className={twMerge("flex items-center gap-3", className)}>
      <div
        role="article"
        aria-label={`${sender.displayName} ${body}`}
        className="flex items-start gap-1">
        <div className="inline-flex gap-2">
          <div className="flex w-10 items-center justify-end">
            <Icon aria-hidden className="text-neutral-500" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              style={{borderBottomColor: accentColor}}
              className="box-border shrink-0 focus-visible:border-b-2">
              <Typography className="font-bold" style={{color: accentColor}}>
                {trim(sender.displayName, MAX_EVENT_SENDER_NAME_LENGTH)}
              </Typography>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              onCloseAutoFocus={event => {
                event.preventDefault()
              }}>
              <DropdownMenuItemGenerator
                items={[
                  {
                    label: t(LangKey.ViewMember),
                    icon: IoPeopleCircle,
                    onClick: onShowMember,
                  },
                  {
                    label: t(LangKey.FindUser),
                    icon: IoSearchCircle,
                    onClick: onFindUser,
                  },
                ]}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Typography
          ariaHidden
          className="inline-flex gap-1 whitespace-pre-line break-words font-normal italic">
          {trim(body, MAX_EVENT_BODY_LENGTH)}
        </Typography>
      </div>

      <time className="ml-auto text-base font-normal text-gray-300">
        {formatTime(timestamp)}
      </time>
    </div>
  )
}

export default EventMessage
