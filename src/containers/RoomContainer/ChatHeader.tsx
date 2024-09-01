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
        tooltip="Search"
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
        tooltip="Expand Roster"
        Icon={isRosterExpanded ? IoChevronForward : IoChevronBack}
      />
    </header>
  )
}

export default ChatHeader
