import {type FC} from "react"
import MessageContainer, {type MessageBaseProps} from "./MessageContainer"
import Typography, {TypographyVariant} from "./Typography"
import ProgressBar, {ProgressBarState, ProgressBarVariant} from "./ProgressBar"
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
import {IoCloseCircle} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

export enum FileMessageVariant {
  Default,
  Upload,
}

export interface FileMessageProps extends MessageBaseProps {
  fileName: string
  fileSize: number
  fileExtension: string
  onClick: () => void
  hasDownloadStarted?: boolean
  progressDownloaded?: number
  variant?: FileMessageVariant
  progressBarState?: ProgressBarState
}

const FileMessage: FC<FileMessageProps> = ({
  authorDisplayName,
  authorDisplayNameColor,
  authorAvatarUrl,
  onAuthorClick,
  timestamp,
  fileName,
  fileSize,
  fileExtension,
  onClick,
  hasDownloadStarted = false,
  progressDownloaded = 0,
  variant = FileMessageVariant.Default,
  progressBarState = ProgressBarState.Progress,
}) => {
  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      authorAvatarUrl={authorAvatarUrl}
      children={
        variant === FileMessageVariant.Default ? (
          <DefaultFileMessage
            fileName={fileName}
            fileSize={fileSize}
            onClick={onClick}
            fileExtension={fileExtension}
            hasDownloadStarted={hasDownloadStarted}
            progressDownloaded={progressDownloaded}
          />
        ) : (
          <UploadFileMessage
            fileName={fileName}
            fileSize={fileSize}
            onClick={onClick}
            fileExtension={fileExtension}
            progressBarState={progressBarState}
            progressUpload={progressDownloaded}
          />
        )
      }
      timestamp={timestamp}
      onAuthorClick={onAuthorClick}
    />
  )
}

export type DefaultFileMessageProps = {
  fileName: string
  fileSize: number
  fileExtension: string
  onClick: () => void
  hasDownloadStarted?: boolean
  progressDownloaded?: number
}

const DefaultFileMessage: FC<DefaultFileMessageProps> = ({
  fileName,
  fileSize,
  fileExtension: typeFile,
  onClick,
  hasDownloadStarted: isDownloadStarted = false,
  progressDownloaded = 0,
}) => {
  return (
    <div className="flex w-messageMaxWidth flex-col items-center gap-2 rounded border bg-gray-50 p-2">
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
          {fileSizeToString(fileSize)}
        </Typography>
      </div>
    </div>
  )
}

type UploadFileMessageProps = {
  fileName: string
  fileSize: number
  fileExtension: string
  onClick: () => void
  progressBarState: ProgressBarState
  progressUpload?: number
}

const UploadFileMessage: FC<UploadFileMessageProps> = ({
  fileName,
  fileExtension,
  progressUpload = 0,
  progressBarState,
  fileSize,
}) => {
  return (
    <div className="flex w-messageMaxWidth rounded border bg-slate-100 p-2">
      <div className="flex w-full items-center gap-2">
        <div>
          <IconFile typeFile={fileExtension.toLowerCase()} />
        </div>

        <div className="w-full">
          <Typography
            className="font-light text-black"
            variant={TypographyVariant.Body}>
            {fileName}
          </Typography>

          <Typography
            className="font-light text-slate-400"
            variant={TypographyVariant.BodySmall}>
            Uploading {fileSizeToString(fileSize * (progressUpload / 100))} /{" "}
            {fileSizeToString(fileSize)}
          </Typography>

          <div className="w-full">
            <ProgressBar
              progress={progressUpload}
              variant={ProgressBarVariant.Linear}
              state={progressBarState}
            />
          </div>
        </div>
      </div>
      <div className="flex w-40 items-center gap-1">
        <Typography
          className={twMerge(
            "w-full text-right",
            progressUpload === 100 ? "text-green-600" : "text-indigo-600"
          )}
          variant={TypographyVariant.BodySmall}>
          Complete {progressUpload}%
        </Typography>

        <IoCloseCircle />
      </div>
    </div>
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fileSizeToString = (fileSize: number) => {
  const KB = 1024
  const MB = KB * 1024
  const GB = MB * 1024
  const TB = GB * 1024

  if (fileSize < KB) {
    return "" + fileSize + " B"
  } else if (fileSize < MB) {
    const size = fileSize / KB
    return size.toFixed(2) + " KB"
  } else if (fileSize < GB) {
    const size = fileSize / MB
    return size.toFixed(2) + " MB"
  } else if (fileSize < TB) {
    const size = fileSize / GB
    return size.toFixed(2) + " GB"
  } else if (fileSize < TB * 1024) {
    const size = fileSize / TB
    return size.toFixed(2) + " TB"
  }

  return "1024+ TB"
}
export default FileMessage
