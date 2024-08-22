import {useRef, useState, type FC} from "react"
import {
  useFloating,
  useInteractions,
  useClick,
  shift,
  flip,
  offset,
} from "@floating-ui/react"
import {
  IoAddCircle,
  IoDocument,
  IoImage,
  IoMic,
  IoVideocam,
} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"
import {type IconType} from "react-icons"
import usePicker, {SourceType} from "@/hooks/util/useSinglePicker"

const DevelopmentPreview: FC = () => {
  return (
    <>
      {/* <ChooseFileButton
        onPickFile={function (): void {
          throw new Error("Function not implemented.")
        }}
      /> */}
    </>
  )
}

const BUTTON_SIZE_CLASS = "size-5 md:size-7"

type ChooseFileButtonProps = {
  onPickFile: () => void
}

const ChooseFileButton: FC<ChooseFileButtonProps> = ({onPickFile}) => {
  const [isOpen, setIsOpen] = useState(false)

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom",
    middleware: [flip(), shift(), offset({crossAxis: 8, mainAxis: 4})],
  })

  const click = useClick(context)

  const {getReferenceProps, getFloatingProps} = useInteractions([click])

  return (
    <>
      <motion.button
        animate={{rotate: isOpen ? "45deg" : undefined}}
        ref={refs.setReference}
        {...getReferenceProps()}>
        <IoAddCircle className={twMerge("text-slate-400", BUTTON_SIZE_CLASS)} />
      </motion.button>

      {isOpen && (
        <motion.div
          animate={{opacity: 0.8}}
          whileInView={{opacity: 1}}
          className="flex w-full max-w-40 flex-col gap-1 rounded-md border border-slate-200 bg-white px-1 py-2 shadow-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}>
          <FileTypeButton
            label="File"
            Icon={IoDocument}
            onClick={() => {
              setIsOpen(false)

              throw new Error("Pick files not implemented.")
            }}
          />

          <FileTypeButton
            label="Image"
            Icon={IoImage}
            onClick={() => {
              setIsOpen(false)

              throw new Error("Pick images not implemented.")
            }}
          />

          <FileTypeButton
            label="Video"
            Icon={IoVideocam}
            onClick={() => {
              setIsOpen(false)

              throw new Error("Pick videos not implemented.")
            }}
          />

          <FileTypeButton
            label="Audio"
            Icon={IoMic}
            onClick={() => {
              setIsOpen(false)

              throw new Error("Pick audios not implemented.")
            }}
          />
        </motion.div>
      )}
    </>
  )
}

const FileTypeButton: FC<{
  label: string
  onClick: () => void
  Icon: IconType
}> = ({Icon, label, onClick}) => {
  return (
    <motion.button
      initial={{translateY: -10, opacity: 0.5}}
      whileInView={{translateY: 0, opacity: 1}}
      className="flex gap-2 rounded-md px-3 py-2 hover:bg-gray-100"
      onClick={onClick}>
      <Icon />
      {label}
    </motion.button>
  )
}

export default DevelopmentPreview
