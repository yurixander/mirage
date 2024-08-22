import {useEffect, useState} from "react"

export enum SourceType {
  Image = "image/*",
  Video = "video/*",
  Audio = "audio/*",
  File = "file/*",
}

const usePicker = (
  sourceType: SourceType,
  onFileLoaded: (sourceUrl: string, sourceType: SourceType) => void
): (() => void) => {
  const [input, setInput] = useState<HTMLInputElement | null>(null)

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

      try {
        const url = URL.createObjectURL(file)

        onFileLoaded(url, sourceType)
      } catch {
        // TODO: Show toast error when error ocurred.

        console.error("Error loading file.")
      }
    }

    newInput.addEventListener("change", handleFileChange)
  }, [input, onFileLoaded, sourceType])

  return (): void => {
    if (input === null) {
      throw new Error("Could not open file picker.")
    }

    input.click()
  }
}

export default usePicker
