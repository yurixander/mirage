import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import type {FC} from "react"
import {IoCloseCircle} from "react-icons/io5"
import Typography, {TypographyVariant} from "./Typography"
import {Button} from "./ui/button"

export type AlertDialogProps = {
  title: string
  message: string
  onClose: () => void
  onAccept: () => void
}

const AlertDialog: FC<AlertDialogProps> = ({
  title,
  message,
  onClose,
  onAccept,
}) => {
  const {t} = useTranslation()

  return (
    <div className="flex h-60 w-96 flex-col rounded-lg border bg-white shadow-lg">
      <div className="flex w-full items-center justify-center rounded-t-lg border-b bg-slate-100 p-3">
        <Typography
          className="w-full"
          variant={TypographyVariant.HeadingMedium}>
          {title}
        </Typography>

        <IoCloseCircle role="button" size={20} onClick={onClose} />
      </div>

      <div className="h-full overflow-auto bg-slate-50 p-2">
        <Typography>{message}</Typography>
      </div>

      <div className="flex w-full justify-end rounded-b-lg border-t bg-slate-100 p-3">
        <Button onClick={onAccept}>{t(LangKey.Accept)}</Button>
      </div>
    </div>
  )
}

export default AlertDialog
