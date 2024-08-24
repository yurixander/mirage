import useFilePicker, {SourceType} from "@/hooks/util/useFilePicker"
import {
  flip,
  offset,
  shift,
  useClick,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import {motion} from "framer-motion"
import {type FC, useState} from "react"
import {type IconType} from "react-icons"
import {
  IoAddCircle,
  IoDocument,
  IoImage,
  IoVideocam,
  IoMic,
} from "react-icons/io5"

type ChooseFileButtonProps = {
  onPickFile: (sourceUrl: string, sourceType: SourceType) => void
}

const ChooseFileButton: FC<ChooseFileButtonProps> = ({onPickFile}) => {
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
        animate={{rotate: isOpen ? "45deg" : undefined}}
        ref={refs.setReference}
        {...getReferenceProps()}>
        <IoAddCircle className="size-5 text-slate-400 md:size-7" />
      </motion.button>

      {isOpen && (
        <motion.div
          animate={{opacity: 0.8}}
          whileInView={{opacity: 1}}
          className="z-50 flex w-full max-w-40 flex-col gap-1 rounded-md border border-slate-200 bg-white px-1 py-2 shadow-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}>
          <FileTypeButton
            label="File"
            sourceType={SourceType.File}
            Icon={IoDocument}
            onFileLoaded={(sourceUrl, sourceType) => {
              setIsOpen(false)

              onPickFile(sourceUrl, sourceType)
            }}
          />

          <FileTypeButton
            label="Image"
            sourceType={SourceType.Image}
            Icon={IoImage}
            onFileLoaded={(sourceUrl, sourceType) => {
              setIsOpen(false)

              onPickFile(sourceUrl, sourceType)
            }}
          />

          <FileTypeButton
            label="Video"
            sourceType={SourceType.Video}
            Icon={IoVideocam}
            onFileLoaded={(sourceUrl, sourceType) => {
              setIsOpen(false)

              onPickFile(sourceUrl, sourceType)
            }}
          />

          <FileTypeButton
            label="Audio"
            sourceType={SourceType.Audio}
            Icon={IoMic}
            onFileLoaded={(sourceUrl, sourceType) => {
              setIsOpen(false)

              onPickFile(sourceUrl, sourceType)
            }}
          />
        </motion.div>
      )}
    </>
  )
}

type FilePickerAction = {
  label: string
  sourceType: SourceType
  onFileLoaded: (sourceUrl: string, sourceType: SourceType) => void
  Icon: IconType
}

const FileTypeButton: FC<FilePickerAction> = ({
  Icon,
  label,
  onFileLoaded,
  sourceType,
}) => {
  const openFilePicker = useFilePicker(sourceType, onFileLoaded)

  return (
    <motion.button
      initial={{translateY: -10, opacity: 0.5}}
      whileInView={{translateY: 0, opacity: 1}}
      className="flex gap-2 rounded-md px-3 py-2 hover:bg-gray-100"
      onClick={openFilePicker}>
      <Icon />
      {label}
    </motion.button>
  )
}

export default ChooseFileButton
