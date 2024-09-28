import EmojiPicker from "@/components/EmojiPicker"
import {Input} from "@/components/ui/input"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center">
        {/* <EmojiPicker onPickEmoji={emoji => {}} /> */}
        <div className="grid w-full max-w-sm items-center gap-1.5 p-1"></div>
      </div>
    </>
  )
}

export default DevelopmentPreview
