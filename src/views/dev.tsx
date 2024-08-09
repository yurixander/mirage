import {useRef, useState, type FC} from "react"
import EmojiPicker from "../components/EmojiPicker"
import useElementPoints from "@/hooks/util/useElementPoints"
import {IoIosHappy} from "react-icons/io"

type SelectionRange = {
  selectionStart: number | null
  selectionEnd: number | null
}

const DevelopmentPreview: FC = () => {
  const {clearPoints, points, setPointsByEvent} = useElementPoints()
  const [text, setText] = useState("")
  const [caretPosition, setCaretPosition] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [{selectionStart, selectionEnd}, setSelectionRange] =
    useState<SelectionRange>({
      selectionEnd: null,
      selectionStart: null,
    })

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setText(event.target.value)

    // Preserve the cursor position after updating text.
    if (inputRef.current && caretPosition !== null) {
      inputRef.current.selectionStart = caretPosition
      inputRef.current.selectionEnd = caretPosition
    }

    setSelectionRange({
      selectionEnd: event.target.selectionEnd,
      selectionStart: event.target.selectionStart,
    })
  }

  return (
    <>
      {points !== null && (
        <EmojiPicker
          locationPoints={points}
          onPickEmoji={function (emoji: string): void {
            if (
              selectionStart !== null &&
              selectionEnd !== null &&
              selectionEnd !== selectionStart
            ) {
              try {
                setText(prevText => {
                  if (
                    selectionStart === 1 &&
                    selectionEnd === prevText.length
                  ) {
                    return emoji
                  }

                  return prevText
                    .slice(0, selectionStart)
                    .concat(emoji)
                    .concat(prevText.slice(selectionEnd, prevText.length))
                })

                return
              } catch (error) {
                console.error("Error updating text", error)
              }
            }

            if (caretPosition === null || caretPosition >= text.length) {
              setText(prevText => prevText + emoji)

              return
            }

            setText(prevText =>
              prevText
                .slice(0, caretPosition)
                .concat(emoji)
                .concat(prevText.slice(caretPosition, prevText.length))
            )
          }}
        />
      )}

      <div className="flex size-full items-end justify-center">
        <input
          value={text}
          onChange={handleTextChange}
          onSelect={event => {
            if (!(event.target instanceof HTMLInputElement)) {
              return
            }

            setCaretPosition(event.target.selectionStart ?? 0)

            setSelectionRange({
              selectionEnd: event.target.selectionEnd,
              selectionStart: event.target.selectionStart,
            })
          }}
        />

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
