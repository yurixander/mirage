import {useEffect, useMemo, useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import {type Emoji, type EmojiMartData, type Skin} from "@emoji-mart/data"
import {createPortal} from "react-dom"
import useElementPoints from "@/hooks/util/useElementPoints"
import {type Points} from "./ContextMenu"
import {
  IoIosCafe,
  IoIosPartlySunny,
  IoIosHappy,
  IoIosGlobe,
  IoIosAmericanFootball,
  IoIosBulb,
  IoIosNuclear,
  IoIosFlag,
} from "react-icons/io"
import {type IconType} from "react-icons"
import emojiData from "@/../public/data/emoji-data.json"
import useEmojiSearch from "@/hooks/util/useEmojiSearch"
import Input from "./Input"
import {assert} from "@/utils/util"

const emojiMartData: EmojiMartData = emojiData
const emojis: Emoji[] = Object.values(emojiData.emojis)

export type CategoryWithIcon = {
  category: EmojiCategories
  icon: IconType
}

export enum EmojiCategories {
  People = "people",
  Nature = "nature",
  Foods = "foods",
  Activity = "activity",
  Places = "places",
  Objects = "objects",
  Symbols = "symbols",
  Flags = "flags",
}

const categories: CategoryWithIcon[] = [
  {category: EmojiCategories.People, icon: IoIosHappy},
  {category: EmojiCategories.Nature, icon: IoIosPartlySunny},
  {category: EmojiCategories.Foods, icon: IoIosCafe},
  {category: EmojiCategories.Activity, icon: IoIosAmericanFootball},
  {category: EmojiCategories.Places, icon: IoIosGlobe},
  {category: EmojiCategories.Objects, icon: IoIosBulb},
  {category: EmojiCategories.Symbols, icon: IoIosNuclear},
  {category: EmojiCategories.Flags, icon: IoIosFlag},
]

type EmojiPickerProps = {
  locationPoints: Points
  onPickEmoji: (emoji: string) => void
  className?: string
}

const EmojiPicker: FC<EmojiPickerProps> = ({
  locationPoints,
  onPickEmoji,
  className,
}) => {
  const [categorySelected, setCategorySelected] = useState(
    EmojiCategories.People
  )

  const {emojisResult, setEmojiQuery} = useEmojiSearch()

  const emojiItems = useMemo(() => {
    if (emojisResult === null) {
      return getEmojisByCategory(categorySelected)
    }

    return emojisResult
  }, [categorySelected, emojisResult])

  return (
    <div
      className={twMerge(
        "fixed z-50 flex size-full max-h-96 max-w-80 -translate-x-3/4 -translate-y-full flex-col gap-1 rounded-xl bg-gray-100 p-1.5 shadow-md",
        className
      )}
      style={{
        left: `${locationPoints.x}px`,
        top: `${locationPoints.y - 45}px`,
      }}>
      <div className="flex size-full max-h-10 items-center justify-center gap-1 border-b border-b-slate-300">
        {categories.map(category => (
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
            <category.icon />
          </button>
        ))}
      </div>

      <div className="h-12 w-full px-9">
        <Input placeholder="Search any emoji" onValueChange={setEmojiQuery} />
      </div>

      <div className="size-full overflow-y-scroll scrollbar-hide">
        {emojiItems.map(emoji => (
          <div
            key={emoji.id}
            className="inline-block rounded-md hover:bg-gray-300">
            <EmojiItem
              emojiId={emoji.id}
              skins={emoji.skins}
              onPickEmoji={onPickEmoji}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

type EmojiItemProps = {
  emojiId: string
  skins: Skin[]
  onPickEmoji: (emoji: string) => void
}

const EmojiItem: FC<EmojiItemProps> = ({emojiId, skins, onPickEmoji}) => {
  const [isVariationOpen, setIsVariationOpen] = useState(false)
  const [emojiHeaderSelected, setEmojiHeaderSelected] = useState("")
  const {points, clearPoints, setPointsByEvent} = useElementPoints()

  assert(emojiId.length > 0, "Emoji id should not be empty.")

  useEffect(() => {
    if (skins.length === 0) {
      return
    }

    const emojiHeaderStored = localStorage.getItem(emojiId)
    const currentEmojiHeader = skins[0].native

    setEmojiHeaderSelected(emojiHeaderStored ?? currentEmojiHeader)
  }, [emojiId, skins])

  return skins.length > 1 ? (
    <div className="relative flex flex-col">
      {isVariationOpen &&
        points !== null &&
        createPortal(
          <div
            className="fixed z-50 flex size-max -translate-x-1/2 rounded-md bg-gray-100 p-2 shadow-lg"
            style={{left: `${points.x}px`, top: `${points.y}px`}}
            onMouseLeave={() => {
              setIsVariationOpen(false)

              clearPoints()
            }}>
            {skins.map((skin, index) => (
              <div
                key={index}
                aria-hidden
                className="relative size-8 items-center justify-center rounded-md text-2xl hover:bg-gray-300"
                onClick={() => {
                  setEmojiHeaderSelected(skin.native)

                  localStorage.setItem(emojiId, skin.native)

                  onPickEmoji(skin.native)

                  setIsVariationOpen(false)
                  clearPoints()
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
            setPointsByEvent(event)

            setIsVariationOpen(prevVariationIsOpen => !prevVariationIsOpen)
          }}>
          <svg
            aria-label="More variants"
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

function getEmojisByCategory(categoryId?: string): Emoji[] {
  if (categoryId === undefined) {
    return []
  }

  const category = emojiMartData.categories.find(
    category => category.id === categoryId
  )

  if (category === undefined) {
    return []
  }

  return category.emojis.map(emojiId => emojiMartData.emojis[emojiId])
}

export function searchEmoji(query: string): Emoji[] {
  return emojis.filter(emoji => emoji.keywords.includes(query.toLowerCase()))
}

export default EmojiPicker
