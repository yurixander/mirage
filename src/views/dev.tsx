import EmojiPicker from "@/components/EmojiPicker"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center">
        <EmojiPicker onPickEmoji={emoji => {}} />
      </div>
    </>
  )
}

export default DevelopmentPreview
