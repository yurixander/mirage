import {type Emoji, type EmojiMartData} from "@emoji-mart/data"
import {useCallback, useEffect, useState} from "react"

type UseEmojiPickerReturnType = {
  isCategoryLoading: boolean
  isError: boolean
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
  const [error, setError] = useState(false)

  const [categories, setCategories] = useState<CategoryWithEmoji[]>([])
  const [isCategoryLoading, setIsCategoryLoading] = useState(false)

  const fetchCategories = (data: EmojiMartData): void => {
    setIsCategoryLoading(true)

    setCategories(
      data.categories.map(category => {
        return {
          category: category.id,
          emojiHeader: data.emojis[category.emojis[0]].skins[0].native,
        }
      })
    )

    setIsCategoryLoading(false)
  }

  useEffect(() => {
    void getEmojiMartData()
      .then(emojiMartData => {
        setEmojiMartData(emojiMartData)

        fetchCategories(emojiMartData)
      })
      .catch(error => {
        console.error("Failed to fetch emoji data:", error)

        setError(true)
      })
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
    isCategoryLoading,
    isError: error,
    categories,
    getEmojisByCategory,
    getEmojiById,
  }
}

async function getEmojiMartData(): Promise<EmojiMartData> {
  const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data")

  return await response.json()
}

export default useEmojiPicker
