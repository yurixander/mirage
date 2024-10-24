import {IconButton} from "@/components/ui/button"
import {useIsSmall} from "@/hooks/util/useMediaQuery"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {type FC} from "react"
import {
  IoChevronForward,
  IoChevronBack,
  IoCall,
  IoVideocam,
  IoSearch,
  IoInformation,
  IoLink,
  IoLockClosed,
  IoClose,
} from "react-icons/io5"
import {LiaSlackHash} from "react-icons/lia"
import {twMerge} from "tailwind-merge"

export type ChatHeaderProps = {
  roomName: string
  isRosterExpanded: boolean
  onRosterExpanded: (isExpanded: boolean) => void
  onCloseRoom: () => void
  className?: string
  roomDescription?: string
  isRoomEncrypted: boolean
}

const ChatHeader: FC<ChatHeaderProps> = ({
  roomName,
  isRosterExpanded,
  onRosterExpanded,
  className,
  onCloseRoom,
  roomDescription,
  isRoomEncrypted,
}) => {
  const {t} = useTranslation()
  const isSm = useIsSmall()

  return (
    <header className={twMerge(className, "flex w-full flex-col gap-1")}>
      <div className="flex w-full items-center justify-center">
        <div className="m-2 flex w-full items-center gap-1">
          {isRoomEncrypted ? (
            <div>
              <IconButton onClick={() => {}} tooltip={t(LangKey.RoomEncrypted)}>
                <IoLockClosed className="size-5 text-blue-800" />
              </IconButton>
            </div>
          ) : (
            <></>
          )}

          <div>
            <LiaSlackHash className="size-5 text-blue-800" />
          </div>

          <div>
            <span className="line-clamp-1 max-w-md text-blue-800">
              {roomName}
            </span>
          </div>

          {roomDescription !== undefined && roomDescription !== "" ? (
            <div>
              <span className="line-clamp-1 max-w-md text-slate-500">
                {"- " + roomDescription}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>

        {isSm ? (
          <>
            <IconButton tooltip={t(LangKey.Call)}>
              <IoCall className="size-5" />
            </IconButton>

            <IconButton tooltip={t(LangKey.VideoCall)}>
              <IoVideocam className="size-5" />
            </IconButton>

            <IconButton tooltip={t(LangKey.CopyLink)}>
              <IoLink className="size-5" />
            </IconButton>

            <IconButton tooltip={t(LangKey.SearchInRoom)}>
              <IoSearch className="size-5" />
            </IconButton>

            <IconButton tooltip={t(LangKey.RoomDetails)}>
              <IoInformation className="size-5" />
            </IconButton>

            <IconButton
              tooltip={t(LangKey.ExpandRoster)}
              onClick={() => {
                onRosterExpanded(!isRosterExpanded)
              }}>
              {isRosterExpanded ? (
                <IoChevronForward className="size-5" />
              ) : (
                <IoChevronBack className="size-5" />
              )}
            </IconButton>
          </>
        ) : (
          <IconButton tooltip={t(LangKey.Close)} onClick={onCloseRoom}>
            <IoClose className="size-5" />
          </IconButton>
        )}
      </div>
    </header>
  )
}

export default ChatHeader
