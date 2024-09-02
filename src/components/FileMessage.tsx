import {type FC} from "react"
import MessageContainer, {
  type MessageBaseData,
  type MessageBaseProps,
} from "./MessageContainer"
import Typography, {TypographyVariant} from "./Typography"
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
import {assert, validateUrl} from "@/utils/util"

const ICON_SIZE = 20

export interface FileMessageProps extends MessageBaseProps, FileMessageData {}

export interface FileMessageData extends MessageBaseData {
  fileName: string
  fileSize: number
  fileUrl?: string
}

const FileMessage: FC<FileMessageProps> = ({
  authorDisplayName,
  authorAvatarUrl,
  onAuthorClick,
  contextMenuItems,
  authorDisplayNameColor,
  timestamp,
  fileName,
  fileSize,
  fileUrl,
  userId,
}) => {
  const fileExtension = getFileExtension(fileName).toUpperCase()

  if (fileUrl !== undefined) {
    assert(validateUrl(fileUrl), "File url should be valid if defined.")
  }

  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      authorAvatarUrl={authorAvatarUrl}
      timestamp={timestamp}
      onAuthorClick={onAuthorClick}
      userId={userId}>
      {/* TODO: Handle context menu here @lazaroysr96 */}
      <div className="w-messageMaxWidth flex flex-col items-center gap-2 rounded border bg-gray-50 p-2">
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
            <IconButton
              Icon={FaDownload}
              color="lightslategrey"
              onClick={() => {
                if (fileUrl !== undefined) open(fileUrl)
              }}
              tooltip="Click to download"
            />
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
    </MessageContainer>
  )
}

export const IconFile: FC<{typeFile: string}> = ({typeFile}) => {
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

export const fileSizeToString = (fileSize: number): string => {
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

export const getFileExtension = (fileName: string): string => {
  const match = fileName.lastIndexOf(".")

  return match === -1 ? "file" : fileName.slice(match + 1, fileName.length)
}

export default FileMessage
