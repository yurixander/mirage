import {type Emoji, type EmojiMartData} from "@emoji-mart/data"
import {useCallback, useEffect, useState} from "react"
import emojiData from "@/../public/data/emoji-data.json" assert {type: "json"}

type UseEmojiPickerReturnType = {
  isLoading: boolean
  categories: CategoryWithEmoji[]
  getEmojisByCategory: (categoryId?: string) => Emoji[]
  getEmojiById: (emojiId: string) => Emoji | null
}

export type CategoryWithEmoji = {
  category: string
  emojiHeader: string
}

const useEmojiPicker = (): UseEmojiPickerReturnType => {
  const [emojiMartData, setEmojiMartData] = useState<EmojiMartData>()
  const [isLoading, setIsLoading] = useState(true)

  const [categories, setCategories] = useState<CategoryWithEmoji[]>([])

  const fetchCategories = (data: EmojiMartData): void => {
    setCategories(
      data.categories.map(category => {
        return {
          category: category.id,
          emojiHeader: data.emojis[category.emojis[0]].skins[0].native,
        }
      })
    )
  }

  useEffect(() => {
    const emojis: EmojiMartData = emojiData

    setEmojiMartData(emojis)
    fetchCategories(emojis)

    setIsLoading(false)
  }, [])

  const getEmojisByCategory = useCallback(
    (categoryId?: string): Emoji[] => {
      if (categoryId === undefined || emojiMartData === undefined) {
        return []
      }

      const category = emojiMartData.categories.find(
        category => category.id === categoryId
      )

      if (category === undefined) {
        return []
      }

      return category.emojis.map(emojiId => emojiMartData.emojis[emojiId])
    },
    [emojiMartData]
  )

  const getEmojiById = useCallback(
    (emojiId: string): Emoji | null => {
      if (emojiMartData === undefined) {
        return null
      }

      return emojiMartData.emojis[emojiId] ?? null
    },
    [emojiMartData]
  )

  return {
    isLoading,
    categories,
    getEmojisByCategory,
    getEmojiById,
  }
}

export default useEmojiPicker
