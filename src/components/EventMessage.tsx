import {useState, type FC} from "react"
import {formatTime, stringToColor} from "../utils/util"
import {IoMdCreate} from "react-icons/io"
import {IoPeopleCircle} from "react-icons/io5"
import {type IconType} from "react-icons"
import {type EventType} from "matrix-js-sdk"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {twMerge} from "tailwind-merge"
import {
  DROPDOWN_ICON_CLASS,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {Heading, Text} from "./ui/typography"

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
  className?: string
}

const EventMessage: FC<EventMessageProps> = ({
  timestamp,
  body,
  sender,
  icon,
  onShowMember,
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const Icon = icon ?? IoMdCreate
  const {t} = useTranslation()
  const accentColor = stringToColor(sender.userId)

  return (
    <div className={twMerge("flex w-full items-center gap-3", className)}>
      <article aria-label={`${sender.displayName} ${body}`}>
        <div className="flex gap-1 sm:gap-2">
          <div className="flex size-5 items-center justify-end sm:size-6">
            <Icon className="fill-neutral-500" />
          </div>

          <div className="inline-block text-start">
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger
                style={{borderBottomColor: accentColor}}
                className="box-border focus-visible:border-b sm:focus-visible:border-b-2">
                <Heading level="h6" style={{color: accentColor}}>
                  {sender.displayName}
                </Heading>
              </DropdownMenuTrigger>

              <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
                <DropdownMenuItem
                  onClick={e => {
                    e.stopPropagation()

                    setIsDropdownOpen(false)

                    onShowMember()
                  }}>
                  <IoPeopleCircle className={DROPDOWN_ICON_CLASS} />

                  <Text>{t(LangKey.ViewMember)}</Text>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Text className="ml-1 italic sm:ml-2">{body}</Text>
          </div>
        </div>
      </article>

      <time className="mb-auto ml-auto shrink-0 text-sm font-normal sm:text-base">
        {formatTime(timestamp)}
      </time>
    </div>
  )
}

export default EventMessage
