import {type FC} from "react"
import MessageContainer, {
  type MessageBaseData,
  type MessageBaseProps,
} from "./MessageContainer"
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
import {IconButton} from "./ui/button"
import {LangKey} from "@/lang/allKeys"
import useTranslation from "@/hooks/util/useTranslation"
import ContextMenu from "./ContextMenu"
import {Text} from "./ui/typography"

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
  messageId,
}) => {
  const {t} = useTranslation()
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
      <ContextMenu id={`file-message-${messageId}`} elements={contextMenuItems}>
        <div className="flex w-60 flex-col items-center gap-2 rounded border bg-gray-50 p-2 dark:border-neutral-800 dark:bg-neutral-950 sm:w-messageMaxWidth">
          <div className="flex w-full items-center gap-2">
            <div className="flex w-full items-center gap-2 rounded bg-slate-100 p-2 dark:bg-neutral-900">
              <IconFile typeFile={fileExtension.toLowerCase()} />

              <Text className="text-gray-900 dark:text-gray-100">
                {fileName}
              </Text>
            </div>

            <div>
              <IconButton
                className="text-gray-400"
                tooltip={t(LangKey.ClickToDownload)}
                onClick={() => {
                  if (fileUrl !== undefined) open(fileUrl)
                }}>
                <FaDownload />
              </IconButton>
            </div>
          </div>

          <div className="flex w-full">
            <Text className="w-full font-semibold text-gray-400">
              {fileExtension}
            </Text>

            <Text className="min-w-20 text-right font-semibold text-gray-400">
              {fileSizeToString(fileSize)}
            </Text>
          </div>
        </div>
      </ContextMenu>
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
