import {type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {IoCloseCircle} from "react-icons/io5"
import {fileSizeToString, getFileExtension, IconFile} from "./FileMessage"
import {ReactSVG} from "react-svg"
import {StaticAssetPath} from "@/utils/util"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Button, IconButton} from "./ui/button"

export type FilePreviewProps = {
  fileName: string
  fileSize: number
  onClose: () => void
  onSend: () => void
}

const FilePreview: FC<FilePreviewProps> = ({
  fileName,
  fileSize,
  onClose,
  onSend,
}) => {
  const fileExtension = getFileExtension(fileName).toUpperCase()
  const {t} = useTranslation()

  return (
    <div className="flex w-messageMaxWidth flex-col rounded border bg-slate-50 shadow-lg">
      <div className="flex h-16 w-full items-center rounded-t border-b bg-slate-100 px-5">
        <Typography
          variant={TypographyVariant.HeadingMedium}
          className="w-full">
          {t(LangKey.UploadFile)}
        </Typography>

        <IconButton onClick={onClose}>
          <IoCloseCircle className="size-5 text-gray-500" />
        </IconButton>
      </div>

      <div className="flex size-full flex-col gap-3 p-4">
        <div className="flex w-full flex-col items-center gap-2 rounded border bg-white p-2">
          <div className="flex w-full items-center gap-2 rounded bg-slate-100 p-2">
            <IconFile typeFile={fileExtension.toLowerCase()} />

            <Typography
              className="font-light text-black"
              variant={TypographyVariant.Body}>
              {fileName}
            </Typography>
          </div>

          <div className="flex w-full">
            <Typography
              className="w-full font-semibold text-gray-400"
              variant={TypographyVariant.BodySmall}>
              {fileExtension}
            </Typography>

            <Typography
              className="min-w-20 text-right font-semibold text-gray-400"
              variant={TypographyVariant.BodySmall}>
              {fileSizeToString(fileSize)}
            </Typography>
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden">
          <ReactSVG src={StaticAssetPath.DotGrid} />

          <ReactSVG src={StaticAssetPath.DotGrid} />
        </div>
      </div>
      <div className="flex h-16 w-full items-center justify-end gap-2 border-t bg-slate-100 px-5">
        <Button
          variant="ghost"
          className="w-20 hover:bg-slate-200"
          onClick={onClose}>
          {t(LangKey.Cancel)}
        </Button>

        <Button className="w-20" onClick={onSend}>
          {t(LangKey.Send)}
        </Button>
      </div>
    </div>
  )
}

export default FilePreview
