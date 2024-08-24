import {useEffect, useState} from "react"

export enum SourceType {
  Image = "image/*",
  Video = "video/*",
  Audio = "audio/*",
  File = "file/*",
}

const useFilePicker = (
  sourceType: SourceType,
  onFileLoaded: (file: File, sourceType: SourceType) => void
): (() => void) => {
  const [input] = useState<HTMLInputElement>(() => {
    const newInput = document.createElement("input")
    newInput.type = "file"
    newInput.accept = sourceType ?? "/*"
    newInput.multiple = false
    newInput.style.display = "none"

    return newInput
  })

  useEffect(() => {
    const handleFileChange = (event: Event): void => {
      if (!(event.target instanceof HTMLInputElement)) {
        return
      }

      const file = event.target.files?.[0]

      if (file !== undefined) {
        onFileLoaded(file, sourceType)
      }
    }

    input.addEventListener("change", handleFileChange)

    return () => {
      input.removeEventListener("change", handleFileChange)
    }
  }, [input, onFileLoaded, sourceType])

  return (): void => {
    input.click()
  }
}

export default useFilePicker
