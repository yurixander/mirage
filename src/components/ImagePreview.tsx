import type {FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {IoAdd, IoCloseCircle} from "react-icons/io5"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Button, IconButton} from "./ui/button"

export type ImagePreviewProps = {
  imageUrl: string
  imageName: string
  onClear: () => void
  onSendImage: () => void
}

const ImagePreview: FC<ImagePreviewProps> = ({
  imageUrl,
  onClear,
  onSendImage,
}) => {
  const {t} = useTranslation()

  return (
    <div className="flex size-messageMaxWidth flex-col rounded border bg-slate-50 shadow-xl">
      <div className="flex h-20 items-center border-b bg-slate-100 p-2">
        <Typography variant={TypographyVariant.Heading} className="w-full">
          {t(LangKey.UploadImage)}
        </Typography>

        <IoCloseCircle size={20} role="button" onClick={onClear} />
      </div>

      <div className="flex size-full items-center justify-center rounded p-1">
        <img
          src={imageUrl}
          alt={t(LangKey.Preview)}
          className="h-72 w-full object-contain"
        />
      </div>

      <div className="flex h-20 w-full items-center justify-center gap-2 p-1">
        <img
          src={imageUrl}
          alt={t(LangKey.UploadImage)}
          className="size-14 rounded border bg-white object-contain shadow"
        />

        <IconButton>
          <IoAdd className="size-14 rounded border bg-white text-slate-500" />
        </IconButton>
      </div>

      <div className="flex h-20 justify-end gap-2 border-t bg-slate-100 p-2">
        <Button
          variant="ghost"
          onClick={onClear}
          className="w-20 hover:bg-slate-200">
          {t(LangKey.Cancel)}
        </Button>

        <Button
          className="w-20"
          onClick={() => {
            onSendImage()
            onClear()
          }}>
          {t(LangKey.Send)}
        </Button>
      </div>
    </div>
  )
}

export default ImagePreview
