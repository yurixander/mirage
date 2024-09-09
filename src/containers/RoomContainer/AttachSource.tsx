import useFilePicker, {type SourceType} from "@/hooks/util/useFilePicker"
import {
  flip,
  offset,
  shift,
  useClick,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import {motion} from "framer-motion"
import {type FC, useEffect, useState} from "react"
import {useTranslation} from "react-i18next"
import {type IconType} from "react-icons"
import {
  IoAddCircle,
  IoDocument,
  IoImage,
  IoVideocam,
  IoMic,
} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

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

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [flip(), shift(), offset({crossAxis: 20, mainAxis: 16})],
  })

  const click = useClick(context)

  const {getReferenceProps, getFloatingProps} = useInteractions([click])

  return (
    <>
      <motion.button
        aria-label={t("Attach source")}
        disabled={isDisabled}
        className="disabled:opacity-80"
        animate={{rotate: isOpen ? "45deg" : undefined}}
        ref={refs.setReference}
        {...getReferenceProps()}>
        <IoAddCircle
          className={twMerge("size-5 text-slate-400 md:size-7", className)}
        />
      </motion.button>

      {isOpen && (
        <motion.div
          animate={{opacity: 0.8}}
          whileInView={{opacity: 1}}
          className="z-50 flex w-full max-w-40 flex-col gap-1 rounded-md border border-slate-200 bg-white px-1 py-2 shadow-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}>
          <AttachAction
            ariaLabel={t("Attach file")}
            label={t("File")}
            sourceType="file/*"
            Icon={IoDocument}
            onFileLoaded={file => {
              setIsOpen(false)

              onPickFile(file)
            }}
          />

          <AttachAction
            ariaLabel={t("Attach image")}
            label={t("Image")}
            sourceType="image/*"
            Icon={IoImage}
            onFileLoaded={file => {
              setIsOpen(false)

              onPickFile(file)
            }}
          />

          <AttachAction
            ariaLabel={t("Attach video")}
            label={t("Video")}
            sourceType="video/*"
            Icon={IoVideocam}
            onFileLoaded={file => {
              setIsOpen(false)

              onPickFile(file)
            }}
          />

          <AttachAction
            label={t("Audio")}
            ariaLabel={t("Attach audio")}
            sourceType="audio/*"
            Icon={IoMic}
            onFileLoaded={file => {
              setIsOpen(false)

              onPickFile(file)
            }}
          />
        </motion.div>
      )}
    </>
  )
}

type AttachActionProps = {
  label: string
  ariaLabel: string
  sourceType: SourceType
  onFileLoaded: (file: File) => void
  Icon: IconType
}

const AttachAction: FC<AttachActionProps> = ({
  Icon,
  label,
  ariaLabel,
  onFileLoaded,
  sourceType,
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
    <motion.button
      aria-label={ariaLabel}
      className="flex gap-2 rounded-md px-3 py-2 hover:bg-gray-100"
      onClick={onPickFile}>
      <Icon />
      {label}
    </motion.button>
  )
}

export default AttachSource
