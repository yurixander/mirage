import {type FC} from "react"
import {EmojiPickerPopover} from "../containers/RoomContainer/ChatInput"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <EmojiPickerPopover
        onPickEmoji={function (emoji: string): void {
          throw new Error("Function not implemented.")
        }}
      />
    </>
  )
}

export default DevelopmentPreview
