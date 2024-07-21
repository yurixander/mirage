import {type FC} from "react"
import MessageContainer from "./MessageContainer"
import Typography, {TypographyVariant} from "./Typography"
import ProgressBar, {ProgressBarVariant} from "./ProgressBar"
import IconButton from "./IconButton"
import {
  FaDownload,
  FaFile,
  FaFileCode,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaFileZipper,
} from "react-icons/fa6"

type FileMessageProps = {
  authorDisplayName: string
  authorDisplayNameColor: string
  fileName: string
  fileSize: string
  typeFile: string
  onClick: () => void
  isDownloadStarted?: boolean
  progressDownloaded?: number
}

const FileMessage: FC<FileMessageProps> = ({
  authorDisplayName,
  authorDisplayNameColor,
  fileName,
  fileSize,
  typeFile,
  onClick,
  isDownloadStarted = false,
  progressDownloaded = 0,
}) => {
  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      children={
        <div className="flex w-full flex-col items-center gap-2 rounded border bg-gray-50 p-2">
          <div className="flex w-full items-center gap-2">
            <div className="flex w-full items-center gap-2 rounded bg-slate-100 p-2">
              <IconFile typeFile={typeFile.toLowerCase()} />

              <Typography
                className="font-light text-black"
                variant={TypographyVariant.Body}>
                {fileName}
              </Typography>
            </div>
            <div>
              <IconButton
                Icon={FaDownload}
                color="lightslategrey"
                onClick={onClick}
                tooltip="Click to download"
              />
            </div>
          </div>

          {isDownloadStarted ? (
            <div className="w-full">
              <ProgressBar
                progress={progressDownloaded}
                variant={ProgressBarVariant.Linear}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex w-full">
            <Typography
              className="w-full font-semibold text-gray-400"
              variant={TypographyVariant.BodySmall}>
              {typeFile}
            </Typography>
            <Typography
              className="min-w-20 text-right font-semibold text-gray-400"
              variant={TypographyVariant.BodySmall}>
              {fileSize}
            </Typography>
          </div>
        </div>
      }
      timestamp={0}
      onAuthorClick={() => {}}
    />
  )
}

const IconFile: FC<{typeFile: string}> = ({typeFile}) => {
  switch (typeFile) {
    case "zip":
    case "rar":
    case "gzip": {
      return <FaFileZipper className="text-yellow-500" size={20} />
    }
    case "doc":
    case "docx": {
      return <FaFileWord className="text-blue-600" size={20} />
    }
    case "xls":
    case "xlsx": {
      return <FaFileExcel className="text-green-600" size={20} />
    }
    case "ppt":
    case "pptx": {
      return <FaFilePowerpoint className="text-red-600" size={20} />
    }
    case "pdf": {
      return <FaFilePdf className="text-red-600" size={20} />
    }
    case "java":
    case "c":
    case "js":
    case "html":
    case "css":
    case "php":
    case "ts":
    case "tsx":
    case "jsx": {
      return <FaFileCode className="text-blue-600" size={20} />
    }
    default: {
      return <FaFile className="text-blue-600" size={20} />
    }
  }
}
export default FileMessage
