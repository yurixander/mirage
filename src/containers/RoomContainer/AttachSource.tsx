import useFilePicker, {type SourceType} from "@/hooks/util/useFilePicker"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {
  IoAddCircle,
  IoDocument,
  IoImage,
  IoVideocam,
  IoMic,
} from "react-icons/io5"
import {motion} from "framer-motion"
import React, {type FC, useEffect, useState} from "react"
import {twMerge} from "tailwind-merge"
import {IconButton} from "@/components/ui/button"
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
  isDisabled?: boolean
  className?: string
}

const AttachSource: FC<ChooseFileButtonProps> = ({
  onPickFile,
  isDisabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {t} = useTranslation()

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <IconButton
          tabIndex={0}
          aria-label={t(LangKey.AttachSource)}
          tooltip={t(LangKey.AttachSource)}
          aria-disabled={isDisabled}
          disabled={isDisabled}
          asBoundary={false}>
          <motion.div animate={{rotate: isOpen ? "45deg" : undefined}}>
            <IoAddCircle
              className={twMerge(
                "size-5 fill-neutral-400 dark:fill-neutral-500 md:size-7",
                className
              )}
            />
          </motion.div>
        </IconButton>
      </DropdownMenuTrigger>

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
