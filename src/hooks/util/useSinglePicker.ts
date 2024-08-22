import {useEffect, useState} from "react"

export enum SourceType {
  Image = "image/*",
  Video = "video/*",
  Audio = "audio/*",
  File = "file/*",
}

type UsePickerReturnType = {
  openFilePicker: () => void
  sourceUrl: string | null
}

const usePicker = (sourceType: SourceType): UsePickerReturnType => {
  const [input, setInput] = useState<HTMLInputElement | null>(null)
  const [sourceUrl, setSourceUrl] = useState<string | null>(null)

  useEffect(() => {
    if (input !== null) {
      return
    }

    const newInput = document.createElement("input")
    newInput.type = "file"
    newInput.accept = sourceType ?? "/*"
    newInput.multiple = false
    newInput.style.display = "none"

    setInput(newInput)

    const handleFileChange = (event: Event): void => {
      if (!(event.target instanceof HTMLInputElement)) {
        return
      }

      const file = event.target.files?.[0]

      if (file === undefined) {
        return
      }

      setSourceUrl(URL.createObjectURL(file))
    }

    newInput.addEventListener("change", handleFileChange)
  }, [input, sourceType])

  const openFilePicker = (): void => {
    if (input === null) {
      throw new Error("Could not open file picker.")
    }

    input.click()
  }

  return {
    openFilePicker,
    sourceUrl,
  }
}

export default usePicker
