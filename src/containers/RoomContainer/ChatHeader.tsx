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
import {type RoomDetail} from "./hooks/useRoomDetail"
import {Heading, Text} from "@/components/ui/typography"

export type ChatHeaderProps = {
  roomDetail: RoomDetail
  isRosterExpanded: boolean
  onRosterExpanded: (isExpanded: boolean) => void
  onCloseRoom: () => void
}

const ChatHeader: FC<ChatHeaderProps> = ({
  roomDetail,
  isRosterExpanded,
  onRosterExpanded,
  onCloseRoom,
}) => {
  const {t} = useTranslation()
  const {isRoomEncrypted, roomName, roomDescription} = roomDetail
  const {isLarge} = useBreakpoint()

  const containDescription =
    roomDescription !== undefined && roomDescription.length > 0

  return (
    <header className="flex size-full h-12 w-full flex-col justify-center gap-1 border-b border-b-neutral-200 px-2 py-1 dark:border-b-neutral-700">
      <div className="flex w-full items-center justify-center">
        <div className="m-2 flex w-full items-center gap-1">
          <LiaSlackHash className="size-5 text-blue-800 dark:text-blue-400" />

          <Heading
            level="h5"
            className="w-max max-w-56 truncate text-blue-800 dark:text-blue-400 sm:max-w-md">
            {roomName}
          </Heading>

          {containDescription && (
            <Text
              size="4"
              className="hidden w-max truncate text-neutral-400 sm:block sm:max-w-md">
              - {roomDescription}
            </Text>
          )}

          {isRoomEncrypted && containDescription && (
            <IoLockClosed className="hidden size-4 shrink-0 text-neutral-400 sm:block" />
          )}
        </div>

        {isLarge ? (
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
