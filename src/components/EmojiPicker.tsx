import {useEffect, useRef, useState, type FC} from "react"
import {twMerge} from "tailwind-merge"
import {type Emoji} from "@emoji-mart/data"
import {
  IoIosCafe,
  IoIosPartlySunny,
  IoIosGlobe,
  IoIosAmericanFootball,
  IoIosBulb,
  IoIosNuclear,
} from "react-icons/io"
import {type IconType} from "react-icons"
import {IconButton} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {ScrollArea} from "@/components/ui/scroll-area"
import {IoHappy, IoSearch, IoTime} from "react-icons/io5"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import Input from "./Input"
import useEmojiPicker, {
  Category,
  getCachedEmojiSkin,
} from "@/hooks/util/useEmojiPicker"

type CategoryWithIcon = {
  category: string
  icon: IconType
}

const categories: CategoryWithIcon[] = [
  {category: Category.Recent, icon: IoTime},
  {category: Category.People, icon: IoHappy},
  {category: Category.Nature, icon: IoIosPartlySunny},
  {category: Category.Foods, icon: IoIosCafe},
  {category: Category.Activity, icon: IoIosAmericanFootball},
  {category: Category.Places, icon: IoIosGlobe},
  {category: Category.Objects, icon: IoIosBulb},
  {category: Category.Symbols, icon: IoIosNuclear},
]

type EmojiPickerProps = {
  onPickEmoji: (emoji: string) => void
  className?: string
}

const EmojiPicker: FC<EmojiPickerProps> = ({onPickEmoji, className}) => {
  const {
    pushEmojiRecent,
    emojiItems,
    categoryActive,
    setCategoryActive,
    setEmojiQuery,
  } = useEmojiPicker()

  return (
    <div
      className={twMerge(
        "flex w-full flex-col items-center gap-2 px-2 pt-2",
        className
      )}>
      <Input
        className="w-full"
        placeholder="Search..."
        Icon={IoSearch}
        onValueChange={setEmojiQuery}
      />

      <ScrollArea className="h-72 w-full items-center" type="scroll">
        {emojiItems.map(emoji => {
          return (
            <EmojiItemHandler
              key={`${emoji.id} ${emoji.name}`}
              emoji={emoji}
              onPickEmoji={emojiPicked => {
                onPickEmoji(emojiPicked)

                pushEmojiRecent(emoji.id)
              }}
            />
          )
        })}
      </ScrollArea>

      <div className="flex w-full items-center justify-center gap-1 p-2">
        <CategoryNav
          categorySelected={categoryActive}
          onSelectCategory={setCategoryActive}
        />
      </div>
    </div>
  )
}

type CategoryNavProps = {
  categorySelected: string
  onSelectCategory: (category: string) => void
}

const CategoryNav: FC<CategoryNavProps> = ({
  categorySelected,
  onSelectCategory,
}) => {
  return (
    <ToggleGroup
      onValueChange={value => {
        if (value.length === 0) {
          return
        }

        onSelectCategory(value)
      }}
      defaultValue={categorySelected}
      type="single">
      {categories.map((category, index) => (
        <ToggleGroupItem
          className="h-7 p-1"
          size="sm"
          key={index}
          value={category.category}>
          <category.icon className="size-6 text-gray-300" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

const EmojiItemHandler: FC<{
  emoji: Emoji
  onPickEmoji: (emoji: string) => void
  className?: string
}> = ({emoji, onPickEmoji, className}) => {
  const [currentSkin, setCurrentSkin] = useState(getCachedEmojiSkin(emoji))

  if (currentSkin === null) {
    return <></>
  }

  const onSelectEmoji = (emojiPicked: string): void => {
    localStorage.setItem(emoji.id, emojiPicked)

    onPickEmoji(emojiPicked)
    setCurrentSkin(emojiPicked)
  }

  return emoji.skins.length > 1 ? (
    <PickEmojiWithVariants
      className={className}
      currentSkin={currentSkin}
      emoji={emoji}
      onPickEmoji={onSelectEmoji}
    />
  ) : (
    <PickEmojiButton
      className={className}
      currentSkin={currentSkin}
      emojiName={emoji.name}
      onPickEmoji={onSelectEmoji}
    />
  )
}

type PickEmojiWithVariantsProps = {
  currentSkin: string
  emoji: Emoji
  onPickEmoji: (emoji: string) => void
  className?: string
}

const PickEmojiWithVariants: FC<PickEmojiWithVariantsProps> = ({
  currentSkin,
  emoji,
  onPickEmoji,
  className,
}) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(true)

  const onSelectEmoji = (emojiPicked: string): void => {
    onPickEmoji(emojiPicked)

    setIsOpen(false)
  }

  useEffect(() => {
    const ref = triggerRef.current

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    })

    if (ref === null) {
      return
    }

    observer.observe(ref)

    return () => {
      observer.unobserve(ref)
    }
  }, [])

  return (
    <IconButton
      className={twMerge("relative text-2xl", className)}
      onClick={() => {
        onSelectEmoji(currentSkin)
      }}>
      {currentSkin}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger ref={triggerRef} tabIndex={-1}>
          <button
            aria-label="More variants"
            className="absolute bottom-0 right-0 focus-visible:scale-125 focus-visible:transition-transform focus-visible:active:scale-110"
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

        <PopoverContent
          sideOffset={20}
          side="top"
          role="menubar"
          className={twMerge(
            "flex w-max gap-1 p-1",
            !isIntersecting && "invisible"
          )}>
          {emoji.skins.map(skin => (
            <PickEmojiButton
              key={skin.unified}
              role="menuitem"
              hasTooltip={false}
              currentSkin={skin.native}
              emojiName={emoji.name}
              onPickEmoji={onSelectEmoji}
            />
          ))}
        </PopoverContent>
      </Popover>
    </IconButton>
  )
}

type PickEmojiButtonProps = {
  currentSkin: string
  emojiName: string
  onPickEmoji: (emoji: string) => void
  hasTooltip?: boolean
  className?: string
  role?: React.AriaRole
}

const PickEmojiButton: FC<PickEmojiButtonProps> = ({
  currentSkin,
  emojiName,
  onPickEmoji,
  hasTooltip = true,
  role,
  className,
}) => {
  return (
    <IconButton
      role={role}
      aria-label={emojiName}
      tooltip={hasTooltip ? emojiName : undefined}
      className={twMerge("text-2xl", className)}
      onClick={event => {
        event.stopPropagation()

        onPickEmoji(currentSkin)
      }}>
      {currentSkin}
    </IconButton>
  )
}

export default EmojiPicker
