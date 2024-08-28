import {type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {IoAdd, IoCloseCircle} from "react-icons/io5"
import Button, {ButtonVariant} from "./Button"
import {fileSizeToString, getFileExtension, IconFile} from "./FileMessage"

export type FilePreviewProps = {
  fileName: string
  fileSize: number
}

const FilePreview: FC<FilePreviewProps> = ({fileName, fileSize}) => {
  const fileExtension = getFileExtension(fileName).toUpperCase()

  return (
    <div className="flex size-messageMaxWidth flex-col rounded border bg-slate-50 shadow-lg">
      <div className="flex h-20 w-full items-center rounded-t border-b bg-slate-100 p-3">
        <Typography
          variant={TypographyVariant.HeadingMedium}
          className="w-full">
          Upload File
        </Typography>
        <IoCloseCircle size={20} />
      </div>
      <div className="flex size-full flex-col gap-3 p-3">
        <div className="flex w-full flex-col items-center gap-2 rounded border bg-white p-2 shadow">
          <div className="flex w-full items-center gap-2">
            <div className="flex w-full items-center gap-2 rounded bg-slate-100 p-2">
              <IconFile typeFile={fileExtension.toLowerCase()} />

              <Typography
                className="font-light text-black"
                variant={TypographyVariant.Body}>
                {fileName}
              </Typography>
            </div>

            <div>
              <IoCloseCircle size={16} className="text-slate-400" />
            </div>
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
        <div className="flex h-20 w-full flex-col items-center justify-center gap-1 rounded border bg-white shadow">
          <IoAdd size={32} />
          <Typography>ADD FILE</Typography>
        </div>
      </div>
      <div className="flex h-20 w-full items-center justify-end gap-2 border-t bg-slate-100 p-3">
        <Button className="w-20" label="Cancel" onClick={() => {}} />{" "}
        <Button
          className="w-20"
          variant={ButtonVariant.Primary}
          label="Send"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default FilePreview
