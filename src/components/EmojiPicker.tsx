import {useEffect, useState, type FC} from "react"
import useEmojiPicker from "@/hooks/util/useEmojiPicker"
import {twMerge} from "tailwind-merge"
import LoadingEffect from "./LoadingEffect"
import Typography, {TypographyVariant} from "./Typography"
import {type Skin} from "@emoji-mart/data"
import {createPortal} from "react-dom"
import {type Points} from "./ContextMenu"

const EmojiPicker: FC<{onPickEmoji: (emoji: string) => void}> = ({
  onPickEmoji,
}) => {
  const {isError, categories, getEmojisByCategory, isLoading} = useEmojiPicker()

  const [categorySelected, setCategorySelected] = useState<string>()

  useEffect(() => {
    if (categorySelected !== undefined || categories.length === 0) {
      return
    }

    // Select the first category by default.
    setCategorySelected(categories[0].category)
  }, [categories, categorySelected])

  return (
    <div className="flex size-full max-h-96 max-w-80 flex-col gap-1 rounded-xl bg-gray-100 p-1.5 shadow-md">
      {isError ? (
        <div className="flex size-full flex-col items-center justify-center">
          <Typography variant={TypographyVariant.Heading}>
            An error ocurred
          </Typography>

          <Typography>Please try again later.</Typography>
        </div>
      ) : (
        <>
          <header className="flex size-full max-h-10 items-center justify-center gap-1 border-b border-b-slate-300">
            {isLoading ? (
              <CategoriesPlaceHolder />
            ) : (
              categories.map(category => (
                <button
                  key={category.category}
                  className={twMerge(
                    "flex size-7 cursor-pointer items-center justify-center rounded-md active:scale-95",
                    category.category === categorySelected
                      ? "bg-gray-300"
                      : "hover:bg-gray-200"
                  )}
                  onClick={() => {
                    setCategorySelected(category.category)
                  }}>
                  {category.emojiHeader}
                </button>
              ))
            )}
          </header>

          <div className="size-full overflow-y-scroll scrollbar-hide">
            {getEmojisByCategory(categorySelected).map(emoji => (
              <div
                key={emoji.id}
                className="inline-block rounded-md hover:bg-gray-300">
                <EmojiItem skins={emoji.skins} onPickEmoji={onPickEmoji} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

type EmojiItemProps = {
  skins: Skin[]
  onPickEmoji: (emoji: string) => void
}

const EmojiItem: FC<EmojiItemProps> = ({skins, onPickEmoji}) => {
  const [isVariationOpen, setIsVariationOpen] = useState(false)
  const [emojiHeaderSelected, setEmojiHeaderSelected] = useState("")
  // TODO: Create hook for handling this points with `ContextMenu`.
  const [points, setPoints] = useState<Points | null>(null)

  useEffect(() => {
    if (skins.length === 0) {
      return
    }

    setEmojiHeaderSelected(skins[0].native)
  }, [skins])

  return skins.length > 1 ? (
    <div className="relative flex flex-col">
      {isVariationOpen &&
        points !== null &&
        createPortal(
          <div
            className="fixed z-50 flex size-max -translate-x-1/2 rounded-md bg-white p-2 shadow-sm"
            style={{left: `${points.x}px`, top: `${points.y}px`}}
            onMouseLeave={() => {
              setIsVariationOpen(false)

              setPoints(null)
            }}>
            {skins.map((skin, index) => (
              <div
                key={index}
                aria-hidden
                className="relative size-8 items-center justify-center rounded-md text-2xl hover:bg-gray-300"
                onClick={() => {
                  setEmojiHeaderSelected(skin.native)
                  onPickEmoji(skin.native)

                  setIsVariationOpen(false)
                  setPoints(null)
                }}>
                {skin.native}
              </div>
            ))}
          </div>,
          document.body
        )}

      <div
        role="button"
        aria-hidden
        className="relative flex size-11 cursor-default items-center justify-center overflow-hidden text-2xl"
        onClick={() => {
          onPickEmoji(emojiHeaderSelected)
        }}>
        {emojiHeaderSelected}

        <button
          className="absolute bottom-0 right-0"
          onClick={event => {
            event.stopPropagation()

            setPoints({
              x: event.clientX,
              y: event.clientY,
            })

            setIsVariationOpen(prevVariationIsOpen => !prevVariationIsOpen)
          }}>
          <svg
            aria-label="More emojis"
            className="size-3 fill-current text-gray-400"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg">
            <polygon points="9,1 9,9 1,9" />
          </svg>
        </button>
      </div>
    </div>
  ) : (
    skins.length === 1 && (
      <div
        role="button"
        aria-hidden
        className="flex size-11 items-center justify-center text-2xl"
        onClick={() => {
          onPickEmoji(skins[0].native)
        }}>
        {skins[0].native}
      </div>
    )
  )
}

const CategoriesPlaceHolder: FC = () => {
  return Array.from({length: 6}).map((_, index) => (
    <div key={index} className="size-7 overflow-hidden rounded-md bg-gray-300">
      <LoadingEffect />
    </div>
  ))
}

export default EmojiPicker