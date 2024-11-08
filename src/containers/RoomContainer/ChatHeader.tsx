import {IconButton} from "@/components/ui/button"
import useBreakpoint from "@/hooks/util/useMediaQuery"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {type FC} from "react"
import {
  IoChevronForward,
  IoChevronBack,
  IoLockClosed,
  IoClose,
} from "react-icons/io5"
import {LiaSlackHash} from "react-icons/lia"
import {twMerge} from "tailwind-merge"
import {type RoomDetail} from "./hooks/useRoomDetail"
import {Heading, Text} from "@/components/ui/typography"

export type ChatHeaderProps = {
  roomDetail: RoomDetail
  isRosterExpanded: boolean
  onRosterExpanded: (isExpanded: boolean) => void
  onCloseRoom: () => void
  className?: string
}

const ChatHeader: FC<ChatHeaderProps> = ({
  roomDetail,
  isRosterExpanded,
  onRosterExpanded,
  className,
  onCloseRoom,
}) => {
  const {t} = useTranslation()
  const {isRoomEncrypted, roomName, roomDescription} = roomDetail
  const {isSmall} = useBreakpoint()

  const containDescription =
    roomDescription !== undefined && roomDescription.length > 0

  return (
    <header
      className={twMerge(
        className,
        "flex h-12 w-full flex-col justify-center gap-1"
      )}>
      <div className="flex w-full items-center justify-center">
        <div className="m-2 flex w-full items-center gap-1">
          <LiaSlackHash className="size-5 text-blue-800" />

          <Heading
            level="h5"
            className="w-max max-w-56 truncate text-blue-800 sm:max-w-md">
            {roomName}
          </Heading>

          {containDescription && (
            <Text
              size="4"
              className="hidden w-max truncate text-neutral-400 sm:block sm:max-w-md">
              - {roomDescription}
            </Text>
          )}

          {isRoomEncrypted && (
            <IoLockClosed className="hidden size-4 shrink-0 text-neutral-400 sm:block" />
          )}
        </div>

        {isSmall ? (
          <IconButton
            tooltip={t(LangKey.ExpandRoster)}
            onClick={() => onRosterExpanded(!isRosterExpanded)}>
            {isRosterExpanded ? (
              <IoChevronForward className="size-5" />
            ) : (
              <IoChevronBack className="size-5" />
            )}
          </IconButton>
        ) : (
          <IconButton
            className="shrink-0"
            tooltip={t(LangKey.Close)}
            onClick={onCloseRoom}>
            <IoClose className="size-5" />
          </IconButton>
        )}
      </div>
    </header>
  )
}

export default ChatHeader
