import {type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {IoCloseCircle} from "react-icons/io5"
import React from "react"
import {StaticAssetPath} from "@/utils/util"
import {ReactSVG} from "react-svg"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"
import {Button, IconButton} from "./ui/button"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"

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
  const {t} = useTranslation()

  return (
    <motion.div
      initial={{scale: 0.5}}
      animate={{scale: 1}}
      transition={{
        duration: 0.2,
      }}
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

        <IconButton tooltip={t(LangKey.CloseModal)}>
          <IoCloseCircle className="size-5" />
        </IconButton>
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
          variant="default"
          disabled={isDisabled ?? isLoading}
          onClick={onAccept}
          size="sm">
          {actionText}
        </Button>
      </div>
    </motion.div>
  )
}

export default Modal
