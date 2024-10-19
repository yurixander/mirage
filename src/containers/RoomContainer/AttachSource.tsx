import useFilePicker, {type SourceType} from "@/hooks/util/useFilePicker"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {IoDocument, IoImage, IoVideocam, IoMic} from "react-icons/io5"
import React, {type FC, useEffect, useState} from "react"
import {
  DROPDOWN_ICON_CLASS,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Text} from "@/components/ui/typography"

type ChooseFileButtonProps = {
  onPickFile: (file: File) => void
  children: React.ReactNode
}

const AttachSource: FC<ChooseFileButtonProps> = ({onPickFile, children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {t} = useTranslation()

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-40">
        <AttachAction
          aria-label={t(LangKey.AttachFile)}
          sourceType="file/*"
          onFileLoaded={onPickFile}>
          <IoDocument className={DROPDOWN_ICON_CLASS} />

          <Text>{t(LangKey.File)}</Text>
        </AttachAction>

        <AttachAction
          aria-label={t(LangKey.AttachImage)}
          sourceType="image/*"
          onFileLoaded={onPickFile}>
          <IoImage className={DROPDOWN_ICON_CLASS} />

          <Text>{t(LangKey.Image)}</Text>
        </AttachAction>

        <AttachAction
          aria-label={t(LangKey.AttachVideo)}
          sourceType="video/*"
          onFileLoaded={onPickFile}>
          <IoVideocam className={DROPDOWN_ICON_CLASS} />

          <Text>{t(LangKey.Video)}</Text>
        </AttachAction>

        <AttachAction
          aria-label={t(LangKey.AttachAudio)}
          sourceType="audio/*"
          onFileLoaded={onPickFile}>
          <IoMic className={DROPDOWN_ICON_CLASS} />

          <Text>{t(LangKey.Audio)}</Text>
        </AttachAction>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface AttachActionProps extends React.AriaAttributes {
  sourceType: SourceType
  onFileLoaded: (file: File) => void
  children: React.ReactNode
}

const AttachAction: FC<AttachActionProps> = ({
  onFileLoaded,
  sourceType,
  children,
  ...ariaProps
}) => {
  const {contentPicked, onPickFile} = useFilePicker(false, sourceType)

  useEffect(() => {
    if (
      contentPicked === null ||
      contentPicked.isMultiple ||
      contentPicked.pickerResult === null
    ) {
      return
    }

    onFileLoaded(contentPicked.pickerResult)
  }, [contentPicked, onFileLoaded])

  return (
    <DropdownMenuItem
      children={children}
      {...ariaProps}
      onSelect={onPickFile}
    />
  )
}

export default AttachSource
