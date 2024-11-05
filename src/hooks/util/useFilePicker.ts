import {useEffect, useState} from "react"

export type SourceType = "image/*" | "video/*" | "audio/*" | "file/*" | "/*"

type FilePickerResultOf<Multiple extends boolean> = Multiple extends true
  ? File[]
  : File | null

export type PickerResult<Kind extends boolean> = {
  isMultiple: Kind
  pickerResult: FilePickerResultOf<Kind>
}

type AnyPickerResult = PickerResult<true> | PickerResult<false>

type UsePickerReturnType = {
  contentPicked: AnyPickerResult | null
  clear: () => void
  onPickFile: () => void
}

const useFilePicker = <Multiple extends boolean>(
  isMultiple: Multiple,
  sourceType: SourceType = "/*"
): UsePickerReturnType => {
  const [contentPicked, setContentPicked] = useState<AnyPickerResult>()

  const [input] = useState<HTMLInputElement>(() => {
    const newInput = document.createElement("input")
    newInput.type = "file"
    newInput.accept = sourceType
    newInput.multiple = isMultiple

    return newInput
  })

  useEffect(() => {
    const handleFileChange = (event: Event): void => {
      if (!(event.target instanceof HTMLInputElement)) {
        return
      }

      const files = event.target.files

      if (files === null) {
        return
      }

      if (isMultiple) {
        setContentPicked({
          isMultiple: true,
          pickerResult: Array.from(files),
        })
      } else {
        setContentPicked({
          isMultiple: false,
          pickerResult: files[0] ?? null,
        })
      }
    }

    input.addEventListener("change", handleFileChange)

    return () => {
      input.removeEventListener("change", handleFileChange)
    }
  }, [input, isMultiple])

  return {
    contentPicked: contentPicked ?? null,
    onPickFile: () => input.click(),
    clear: () => {
      setContentPicked(undefined)

      input.value = ""
    },
  }
}

export default useFilePicker
