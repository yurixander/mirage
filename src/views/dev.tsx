import EmojiPicker from "@/components/EmojiPicker"
import {type FC} from "react"
import {InputRoot, Input, InputIcon} from "@/components/ui/input"
import {IoSearch} from "react-icons/io5"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center">
        {/* <EmojiPicker onPickEmoji={emoji => {}} /> */}
        <div className="grid w-full max-w-sm items-center gap-1.5 p-1">
          <InputRoot>
            <InputIcon>
              <IoSearch className="size-4 text-gray-300 sm:size-5" />
            </InputIcon>

            <Input className="pl-7 sm:pl-9" placeholder="Buscar..." />
          </InputRoot>
        </div>
      </div>
    </>
  )
}

export default DevelopmentPreview
