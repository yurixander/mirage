import emojiData from "@/../public/data/emoji-data.json"
import type {SelectionRange} from "@/containers/RoomContainer/ChatInput"
import type {Emoji, EmojiMartData} from "@emoji-mart/data"
import {useCallback, useMemo, useState} from "react"
import useEmojiSearch from "./useEmojiSearch"
import {LocalStorageKey} from "./useLocalStorage"

const emojiMartData: EmojiMartData = emojiData
const emojis: Emoji[] = Object.values(emojiData.emojis)

export enum Category {
  Recent = "recent",
  People = "people",
  Nature = "nature",
  Foods = "foods",
  Activity = "activity",
  Places = "places",
  Objects = "objects",
  Symbols = "symbols",
  Flags = "flags",
}

type UseEmojiPickerReturnType = {
  emojiItems: Emoji[]
  recentEmojis: string[]
  categoryActive: string
  pushEmojiRecent: (emojiId: string) => void
  setCategoryActive: (category: string) => void
  setEmojiQuery: (query: string) => void
}

const useEmojiPicker = (): UseEmojiPickerReturnType => {
  const [recentEmojis, setRecentEmoji] = useState(getRecentEmojis())
  const [categoryActive, setCategoryActive] = useState<string>(Category.Recent)
  const {emojisResult, setEmojiQuery} = useEmojiSearch()

  const pushEmojiRecent = useCallback((emojiId: string) => {
    setRecentEmoji(prevEmojis => {
      const newEmojis = prevEmojis.filter(prevId => prevId !== emojiId)

      newEmojis.unshift(emojiId)

      if (newEmojis.length > 24) {
        newEmojis.pop()
      }

      localStorage.setItem(
        LocalStorageKey.RecentEmojis,
        JSON.stringify(newEmojis)
      )

      return newEmojis
    })
  }, [])

  const emojiItems = useMemo(() => {
    if (emojisResult === null) {
      if (categoryActive === Category.Recent) {
        return getEmojisById(...recentEmojis)
      }

      return getEmojisByCategory(categoryActive)
    }

    return emojisResult
  }, [categoryActive, emojisResult, recentEmojis])

  return {
    emojiItems,
    recentEmojis,
    categoryActive,
    pushEmojiRecent,
    setCategoryActive,
    setEmojiQuery,
  }
}

const getRecentEmojis = (): string[] => {
  const cachedRecentEmojis = localStorage.getItem(LocalStorageKey.RecentEmojis)

  try {
    return cachedRecentEmojis === null ? [] : JSON.parse(cachedRecentEmojis)
  } catch {
    return []
  }
}

export function getCachedEmojiSkin(emoji: Emoji): string | null {
  const currentSkin = emoji.skins.at(0)
  const cachedSkin = localStorage.getItem(emoji.id)

  if (currentSkin === undefined) {
    return null
  }

  return cachedSkin ?? currentSkin.native
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

export function getEmojisById(...emojis: string[]): Emoji[] {
  return emojis.map(emojiId => emojiMartData.emojis[emojiId])
}

export function searchEmoji(query: string): Emoji[] {
  return emojis.filter(emoji => emoji.keywords.includes(query.toLowerCase()))
}

export function getEmojiByIndex(index: number): Emoji {
  const emojiIndex = index % emojis.length

  return emojis[emojiIndex]
}

export function putEmojiInPosition(
  emoji: string,
  caretPosition: number | null,
  {selectionEnd, selectionStart}: SelectionRange,
  setText: (updater: (prevText: string) => string) => void
): void {
  setText(prevText => {
    if (
      selectionStart !== null &&
      selectionEnd !== null &&
      selectionEnd !== selectionStart
    ) {
      try {
        if (selectionStart === 1 && selectionEnd === prevText.length) {
          return emoji
        }

        return prevText
          .slice(0, selectionStart)
          .concat(emoji)
          .concat(prevText.slice(selectionEnd, prevText.length))
      } catch (error) {
        console.error("Error updating text", error)
      }
    }

    if (caretPosition === null || caretPosition >= prevText.length) {
      return prevText + emoji
    }

    return prevText
      .slice(0, caretPosition)
      .concat(emoji)
      .concat(prevText.slice(caretPosition, prevText.length))
  })
}

export default useEmojiPicker
