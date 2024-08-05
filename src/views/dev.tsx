import EmojiPicker from "@/components/EmojiPicker"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center bg-slate-600">
        <EmojiPicker />
      </div>
    </>
  )
}

export default DevelopmentPreview
