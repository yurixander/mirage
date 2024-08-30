import IconButton from "@/components/IconButton"
import {type FC} from "react"
import {
  IoInformationCircle,
  IoChevronForward,
  IoChevronBack,
  IoCall,
  IoVideocam,
  IoSearch,
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
  return (
    <header className={className}>
      <div className="m-2 flex w-full gap-1">
        <LiaSlackHash className="text-blue-700" />

        <span className="text-blue-700">{roomName}</span>

        <span className="line-clamp-1 text-slate-500">
          {roomDescription === undefined ? "" : "- " + roomDescription}
        </span>
      </div>

      <IconButton
        onClick={() => {
          /* TODO: Handle `more` button click. */
        }}
        tooltip="Call"
        Icon={IoCall}
      />

      <IconButton
        onClick={() => {
          /* TODO: Handle `more` button click. */
        }}
        tooltip="Video Call"
        Icon={IoVideocam}
      />

      <IconButton
        onClick={() => {
          /* TODO: Handle `search` button click. */
        }}
        tooltip="search"
        Icon={IoSearch}
      />

      <IconButton
        onClick={() => {
          /* TODO: Handle `info` button click. */
        }}
        tooltip="Room details"
        Icon={IoInformationCircle}
      />

      <IconButton
        onClick={() => {
          onRosterExpanded(!isRosterExpanded)
        }}
        tooltip="More actions"
        Icon={isRosterExpanded ? IoChevronForward : IoChevronBack}
      />
    </header>
  )
}

export default ChatHeader
