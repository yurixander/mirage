import {type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {IoCloseCircle} from "react-icons/io5"
import IconButton from "./IconButton"
import React from "react"
import Button from "./Button"
import {StaticAssetPath} from "@/utils/util"
import {ReactSVG} from "react-svg"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"

export type ModalProps = {
  children: React.JSX.Element
  title: string
  actionText: string
  onAccept: () => void
  onClose: () => void
  isLoading?: boolean
  isDisabled?: boolean
  className?: string
}

const Modal: FC<ModalProps> = ({
  onClose,
  children,
  isDisabled,
  isLoading,
  onAccept,
  actionText,
  title,
  className,
}) => {
  return (
    <motion.div
      initial={{scale: 0.5}}
      animate={{scale: 1}}
      className={twMerge(
        "box-border flex max-w-xl flex-col overflow-hidden rounded-md border border-slate-300",
        className
      )}>
      <div className="flex w-full items-center justify-between border-b border-slate-300 bg-gray-50 py-3 pl-6 pr-3">
        <Typography
          variant={TypographyVariant.Heading}
          className="font-bold text-black"
          as="span">
          {title}
        </Typography>

        <IconButton
          tooltip="Close Modal"
          Icon={IoCloseCircle}
          onClick={onClose}
        />
      </div>

      <div className="flex w-full flex-col gap-6 border-b border-slate-300 bg-white p-6">
        {children}

        <div className="flex gap-1 overflow-hidden">
          <ReactSVG src={StaticAssetPath.DotGrid} />

          <ReactSVG src={StaticAssetPath.DotGrid} />
        </div>
      </div>

      <div className="flex justify-end bg-gray-50 p-3">
        <Button
          isSmall
          label={actionText}
          isLoading={isLoading}
          isDisabled={isDisabled}
          onClick={onAccept}
        />
      </div>
    </motion.div>
  )
}

export default Modal
