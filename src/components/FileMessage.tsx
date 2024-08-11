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

const ICON_SIZE = 20

export enum FileMessageVariant {
  Default,
  Upload,
}

export interface FileMessageProps extends MessageBaseProps {
  fileName: string
  fileSize: number
  fileExtension: string
  onClick: () => void
  uploadProgress?: number
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
  uploadProgress = 0,
  variant = FileMessageVariant.Default,
  progressBarState = ProgressBarState.Progress,
}) => {
  // TODO: Use more assert here when already merged https://github.com/yurixander/mirage/pull/72 @lazaroysr96

  const content = (
    <>
      {variant === FileMessageVariant.Default ? (
        <DefaultFileMessage
          fileName={fileName}
          fileSize={fileSize}
          onClick={onClick}
          fileExtension={fileExtension}
        />
      ) : (
        <UploadFileMessage
          fileName={fileName}
          fileSize={fileSize}
          onClick={onClick}
          fileExtension={fileExtension}
          progressBarState={progressBarState}
          uploadProgress={uploadProgress}
        />
      )}
    </>
  )

  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      authorAvatarUrl={authorAvatarUrl}
      children={content}
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
}

const DefaultFileMessage: FC<DefaultFileMessageProps> = ({
  fileName,
  fileSize,
  fileExtension: typeFile,
  onClick,
}) => {
  // TODO: Use more assert here when already merged https://github.com/yurixander/mirage/pull/72 @lazaroysr96

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
  uploadProgress?: number
}

const UploadFileMessage: FC<UploadFileMessageProps> = ({
  fileName,
  fileExtension,
  uploadProgress = 0,
  progressBarState,
  fileSize,
  onClick,
}) => {
  // TODO: Use more assert here when already merged https://github.com/yurixander/mirage/pull/72 @lazaroysr96

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
            Uploading {fileSizeToString(fileSize * (uploadProgress / 100))} /{" "}
            {fileSizeToString(fileSize)}
          </Typography>

          <div className="w-full">
            <ProgressBar
              progress={uploadProgress}
              variant={ProgressBarVariant.Linear}
              state={progressBarState}
            />
          </div>
        </div>
      </div>
      <div className="flex w-40 items-center gap-1">
        <Typography
          className={twMerge(
            "w-full min-w-24 text-right",
            uploadProgress === 100 ? "text-green-600" : "text-indigo-600"
          )}
          variant={TypographyVariant.BodySmall}>
          Complete {uploadProgress}%
        </Typography>

        <IconButton
          tooltip="Click to cancel upload"
          Icon={IoCloseCircle}
          onClick={onClick}
          color="lightslategrey"
        />
      </div>
    </div>
  )
}

const IconFile: FC<{typeFile: string}> = ({typeFile}) => {
  switch (typeFile) {
    case "zip":
    case "rar":
    case "gzip": {
      return <FaFileZipper className="text-yellow-500" size={ICON_SIZE} />
    }

    case "doc":
    case "docx": {
      return <FaFileWord className="text-blue-600" size={ICON_SIZE} />
    }

    case "xls":
    case "xlsx": {
      return <FaFileExcel className="text-green-600" size={ICON_SIZE} />
    }

    case "ppt":
    case "pptx": {
      return <FaFilePowerpoint className="text-red-600" size={ICON_SIZE} />
    }

    case "pdf": {
      return <FaFilePdf className="text-red-600" size={ICON_SIZE} />
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
      return <FaFileCode className="text-blue-600" size={ICON_SIZE} />
    }

    default: {
      return <FaFile className="text-blue-600" size={ICON_SIZE} />
    }
  }
}

const fileSizeToString = (fileSize: number): string => {
  const KB = 1024
  const MB = KB * 1024

  if (fileSize < KB) {
    return `${fileSize} bytes`
  } else if (fileSize < MB) {
    return `${(fileSize / KB).toFixed(2)} KB`
  } else {
    return `${(fileSize / MB).toFixed(2)} MB`
  }
}
export default FileMessage
