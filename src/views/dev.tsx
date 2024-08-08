import {type FC} from "react"
import EmojiPicker from "../components/EmojiPicker"
import useElementPoints from "@/hooks/util/useElementPoints"
import {IoIosHappy} from "react-icons/io"

const DevelopmentPreview: FC = () => {
  const {clearPoints, points, setPointsByEvent} = useElementPoints()

  return (
    <>
      {points !== null && (
        <EmojiPicker
          locationPoints={points}
          onPickEmoji={function (emoji: string): void {
            throw new Error("Function not implemented.")
          }}
        />
      )}

      <div className="flex size-full items-end justify-center">
        <IoIosHappy
          role="button"
          onClick={event => {
            if (points !== null) {
              clearPoints()

              return
            }

            setPointsByEvent(event)
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
