import IconButton from "@/components/IconButton"
import {assert} from "@/utils/util"
import {type FC} from "react"
import {IoMdLink} from "react-icons/io"
import {IoInformationCircle, IoEllipsisVertical} from "react-icons/io5"
import {LiaSlackHash} from "react-icons/lia"

const ChatHeader: FC<{roomName: string}> = ({roomName}) => {
  assert(roomName.length > 0, "room name should not be empty")

  return (
    <header className="flex h-full max-h-14 items-center gap-2 border-b border-b-stone-200 px-3">
      <div className="m-2 flex w-full gap-1">
        <LiaSlackHash className="text-purple-500" />

        <span className="text-purple-500">{roomName}</span>

        {/* <span className="text-stone-600">{text}</span> */}
      </div>

      <IconButton
        onClick={() => {
          /* TODO: Handle `info` button click. */
        }}
        tooltip="Room details"
        Icon={IoInformationCircle}
      />

      <IconButton
        onClick={() => {
          /* TODO: Handle `link` button click. */
        }}
        tooltip="Copy link"
        Icon={IoMdLink}
      />

      <IconButton
        onClick={() => {
          /* TODO: Handle `more` button click. */
        }}
        tooltip="More actions"
        Icon={IoEllipsisVertical}
      />
    </header>
  )
}

export default ChatHeader
