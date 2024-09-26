import {useState, type FC} from "react"
import {getEmojiByIndex} from "../components/EmojiPicker"
import {Skin, type Emoji} from "@emoji-mart/data"
import {IconButton} from "@/components/ui/button"
import {twMerge} from "tailwind-merge"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"

const DevelopmentPreview: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex size-full items-center justify-center">
        {/* <EmojiPicker onPickEmoji={emoji => {}} /> */}
        <div className="flex">
          {/* <EmojiItemButton
            emoji={getEmojiByIndex(0)}
            onPickEmoji={function (emoji: string): void {
              throw new Error("Function not implemented.")
            }}
          /> */}
          <IconButton className="relative">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger>
                <button
                  aria-label="More variants"
                  className="absolute bottom-0 right-0 focus-visible:scale-150 focus-visible:transition-transform focus-visible:active:scale-110"
                  onClick={e => {
                    e.stopPropagation()

                    setIsOpen(true)
                  }}>
                  <svg
                    aria-hidden
                    className="size-3 fill-current text-gray-400"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg">
                    <polygon points="9,1 9,9 1,9" />
                  </svg>
                </button>
              </PopoverTrigger>

              <PopoverContent sideOffset={20} side="top">
                Place content for the popover here.
              </PopoverContent>
            </Popover>
          </IconButton>
        </div>
      </div>
    </>
  )
}

type EmojiItemButtonProps = {
  emoji: Emoji
  onPickEmoji: (emoji: string) => void
  className?: string
}

const EmojiItemHandler: FC<EmojiItemButtonProps> = ({
  emoji,
  onPickEmoji,
  className,
}) => {
  const currentSkin = getCachedEmojiSkin(emoji)

  if (currentSkin === null) {
    return <></>
  }

  return emoji.skins.length > 1 ? (
    <PickEmojiWithVariants emoji={emoji} onPickEmoji={onPickEmoji} />
  ) : (
    <PickEmojiButton
      currentSkin={currentSkin}
      emojiName={emoji.name}
      onPickEmoji={onPickEmoji}
    />
  )
}

const PickEmojiWithVariants: FC<{
  emoji: Emoji
  onPickEmoji: (emoji: string) => void
}> = () => {
  return <></>
}

type PickEmojiButtonProps = {
  currentSkin: string
  emojiName: string
  onPickEmoji: (emoji: string) => void
  className?: string
}

const PickEmojiButton: FC<PickEmojiButtonProps> = ({
  currentSkin,
  emojiName,
  onPickEmoji,
  className,
}) => {
  return (
    <IconButton
      aria-label={emojiName}
      tooltip={emojiName}
      className={twMerge(
        "focus-visible:ring focus-visible:ring-ring",
        className
      )}
      onClick={() => {
        onPickEmoji(currentSkin)
      }}>
      {currentSkin}
    </IconButton>
  )
}

function getCachedEmojiSkin(emoji: Emoji): string | null {
  const currentSkin = emoji.skins.at(0)
  const cachedSkin = localStorage.getItem(emoji.id)

  if (currentSkin === undefined) {
    return null
  }

  return cachedSkin ?? currentSkin.native
}

export default DevelopmentPreview
