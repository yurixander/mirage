import EmojiPicker from "@/components/EmojiPicker"
import Typography from "@/components/Typography"
import {useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [text, setText] = useState("")

  return (
    <>
      <div className="flex size-full flex-col items-center justify-center bg-slate-600">
        <Typography>{text}</Typography>

        <EmojiPicker
          onPickEmoji={emoji => {
            setText(prevText => `${prevText}${emoji}`)
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
