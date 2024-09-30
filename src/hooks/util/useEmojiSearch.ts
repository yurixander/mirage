import {type Emoji} from "@emoji-mart/data"
import {useEffect, useState} from "react"
import {searchEmoji} from "./useEmojiPicker"

type UseEmojiSearchReturnType = {
  emojisResult: Emoji[] | null
  setEmojiQuery: React.Dispatch<React.SetStateAction<string>>
}

const useEmojiSearch = (searchDelay = 500): UseEmojiSearchReturnType => {
  const [emojiQuery, setEmojiQuery] = useState("")
  const [results, setResult] = useState<Emoji[] | null>(null)

  useEffect(() => {
    const search = async (): Promise<void> => {
      if (emojiQuery.length <= 0) {
        setResult(null)

        return
      }

      try {
        const response = searchEmoji(emojiQuery)

        setResult(response)
      } catch (error) {
        console.error("Error during emoji search:", error)

        setResult(null)
      }
    }

    void search()
  }, [emojiQuery])

  return {emojisResult: results, setEmojiQuery}
}

export default useEmojiSearch
