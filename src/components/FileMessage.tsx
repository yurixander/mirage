import {type FC} from "react"
import MessageContainer from "./MessageContainer"
import {IoDocument, IoDownload} from "react-icons/io5"
import Typography, {TypographyVariant} from "./Typography"

const FileMessage: FC = () => {
  return (
    <MessageContainer
      authorDisplayName="Lazaro  Yunier"
      authorDisplayNameColor="#06C"
      children={
        <ChildFileMessage
          fileName="Documentos.zip"
          fileSize="17.02 MB"
          typeFile="ZIP"
        />
      }
      timestamp={0}
      onAuthorClick={() => {}}
    />
  )
}

type ChildFileMessageProps = {
  fileName: string
  typeFile: string
  fileSize: string
}

const ChildFileMessage: FC<ChildFileMessageProps> = ({
  fileName,
  fileSize,
  typeFile,
}) => {
  return (
    <div className="flex w-[300px] items-center gap-2">
      <IoDocument className="text-slate-500" size={40} />
      <div className="w-full">
        <Typography variant={TypographyVariant.Body}>{fileName}</Typography>
        <Typography variant={TypographyVariant.BodySmall}>
          {fileSize} - {typeFile}
        </Typography>
      </div>

      <IoDownload className="cursor-pointer text-slate-600" size={20} />
    </div>
  )
}
export default FileMessage
