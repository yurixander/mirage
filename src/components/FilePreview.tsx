import {useState, type FC} from "react"
import {fileSizeToString, getFileExtension, IconFile} from "./FileMessage"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "./ui/modal"
import {Text} from "./ui/typography"

export type FilePreviewProps = {
  fileName: string
  fileSize: number
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onSend: () => Promise<void>
}

const FilePreview: FC<FilePreviewProps> = ({
  fileName,
  fileSize,
  open,
  onOpenChange,
  onSend,
}) => {
  const fileExtension = getFileExtension(fileName).toUpperCase()
  const {t} = useTranslation()
  const [isSending, setIsSending] = useState(false)

  const handleSendFile = (): void => {
    if (isSending) {
      return
    }

    setIsSending(true)

    void onSend().finally(() => {
      setIsSending(false)

      onOpenChange(false)
    })
  }

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{t(LangKey.UploadFile)}</ModalTitle>
          </ModalHeader>

          <ModalDescription className="pr-3">
            <div className="flex w-full flex-col items-center gap-2 rounded border bg-white p-2 dark:bg-neutral-900">
              <div className="flex w-full items-center gap-2 rounded bg-neutral-100 p-2 dark:bg-neutral-800">
                <IconFile typeFile={fileExtension.toLowerCase()} />

                <Text>{fileName}</Text>
              </div>

              <div className="flex w-full">
                <Text size="1" weight="semibold" className="text-gray-400">
                  {fileExtension}
                </Text>

                <Text
                  size="1"
                  align="right"
                  weight="semibold"
                  className="text-gray-400">
                  {fileSizeToString(fileSize)}
                </Text>
              </div>
            </div>
          </ModalDescription>

          <ModalFooter containDots={false}>
            <ModalCancel>{t(LangKey.Cancel)}</ModalCancel>

            <ModalAction
              disabled={isSending}
              onClick={e => {
                e.preventDefault()

                handleSendFile()
              }}>
              {t(LangKey.Send)}
            </ModalAction>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FilePreview
