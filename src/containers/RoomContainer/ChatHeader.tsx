import {IconButton} from "@/components/ui/button"
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
} from "react-icons/io5"
import {LiaSlackHash} from "react-icons/lia"

export type ChatHeaderProps = {
  roomName: string
  isRosterExpanded: boolean
  onRosterExpanded: (isExpanded: boolean) => void
  className?: string
  roomDescription?: string
}

const ChatHeader: FC<ChatHeaderProps> = ({
  roomName,
  isRosterExpanded,
  onRosterExpanded,
  className,
  roomDescription,
}) => {
  const {t} = useTranslation()

  return (
    <header className={className}>
      <div className="m-2 flex w-full gap-1">
        <div>
          <LiaSlackHash className="text-blue-800" />
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

      <IconButton tooltip={t(LangKey.Call)}>
        <IoCall />
      </IconButton>

      <IconButton tooltip={t(LangKey.VideoCall)}>
        <IoVideocam />
      </IconButton>

      <IconButton tooltip={t(LangKey.CopyLink)}>
        <IoLink />
      </IconButton>

      <IconButton tooltip={t(LangKey.SearchInRoom)}>
        <IoSearch />
      </IconButton>

      <IconButton tooltip={t(LangKey.RoomDetails)}>
        <IoInformation />
      </IconButton>

      <IconButton
        tooltip={t(LangKey.ExpandRoster)}
        onClick={() => {
          onRosterExpanded(!isRosterExpanded)
        }}>
        {isRosterExpanded ? <IoChevronForward /> : <IoChevronBack />}
      </IconButton>
    </header>
  )
}

export default ChatHeader
