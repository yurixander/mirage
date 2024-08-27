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
  className?: string
}

const AttachSource: FC<ChooseFileButtonProps> = ({onPickFile, className}) => {
  const [isOpen, setIsOpen] = useState(false)

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [flip(), shift(), offset({crossAxis: 40, mainAxis: 16})],
  })

  const click = useClick(context)

  const {getReferenceProps, getFloatingProps} = useInteractions([click])

  return (
    <>
      <motion.button
        aria-label="Attach source"
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
            ariaLabel="Attach file"
            label="File"
            sourceType="file/*"
            Icon={IoDocument}
            onFileLoaded={file => {
              setIsOpen(false)

              onPickFile(file)
            }}
          />

          <AttachAction
            ariaLabel="Attach image"
            label="Image"
            sourceType="image/*"
            Icon={IoImage}
            onFileLoaded={file => {
              setIsOpen(false)

              onPickFile(file)
            }}
          />

          <AttachAction
            ariaLabel="Attach video"
            label="Video"
            sourceType="video/*"
            Icon={IoVideocam}
            onFileLoaded={file => {
              setIsOpen(false)

              onPickFile(file)
            }}
          />

          <AttachAction
            label="Audio"
            ariaLabel="Attach audio"
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
      initial={{translateY: -10, opacity: 0.5}}
      whileInView={{translateY: 0, opacity: 1}}
      className="flex gap-2 rounded-md px-3 py-2 hover:bg-gray-100"
      onClick={onPickFile}>
      <Icon />
      {label}
    </motion.button>
  )
}

export default AttachSource