import {useEffect, useMemo, useState, type FC} from "react"
import {IoCamera, IoTrashBin} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import useFilePicker from "@/hooks/util/useFilePicker"
import {LangKey} from "@/lang/allKeys"
import useTranslation from "@/hooks/util/useTranslation"
import {IconButton} from "./ui/button"
import {useToast} from "@/hooks/use-toast"
import {Text} from "./ui/typography"

type UploadAvatarProps = {
  onMxcUrlResult: (matrixSrc: string) => void
  onUploadAvatar: (
    file: File,
    progressCallback: (percent: number) => void
  ) => Promise<string>
  className?: string
}

const AVATAR_UPLOADER_SIZE = "size-16"

const AvatarUploader: FC<UploadAvatarProps> = ({
  onMxcUrlResult,
  onUploadAvatar,
  className,
}) => {
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isUploaded, setIsUploaded] = useState(false)
  const {contentPicked, onPickFile, clear} = useFilePicker(false, "image/*")
  const {t} = useTranslation()
  const {toast} = useToast()

  useEffect(() => {
    if (
      contentPicked === null ||
      contentPicked.isMultiple ||
      contentPicked.pickerResult === null ||
      isUploaded
    ) {
      return
    }

    setIsImageUploading(true)

    onUploadAvatar(contentPicked.pickerResult, setProgress)
      .then(mxcUrl => {
        onMxcUrlResult(mxcUrl)

        setIsUploaded(true)
      })
      .catch((error: Error) => {
        clear()

        toast({
          variant: "destructive",
          title: error.name,
          description: error.message,
        })
      })
      .finally(() => {
        setIsImageUploading(false)
      })
  }, [clear, contentPicked, isUploaded, onMxcUrlResult, onUploadAvatar, toast])

  const avatarImageUrl: string | null = useMemo(() => {
    if (
      contentPicked === null ||
      contentPicked.isMultiple ||
      contentPicked.pickerResult === null ||
      !contentPicked.pickerResult.type.startsWith("image/")
    ) {
      return null
    }

    return URL.createObjectURL(contentPicked.pickerResult)
  }, [contentPicked])

  useEffect(() => {
    return () => {
      if (avatarImageUrl === null) {
        return
      }

      URL.revokeObjectURL(avatarImageUrl)
    }
  }, [avatarImageUrl])

  return avatarImageUrl === null ? (
    <IconButton
      onClick={onPickFile}
      tooltip={t(LangKey.UploadImage)}
      aria-label={t(LangKey.UploadImage)}
      className={twMerge(
        "flex shrink-0 items-center justify-center rounded-md bg-neutral-100 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        AVATAR_UPLOADER_SIZE,
        className
      )}>
      <IoCamera className="text-slate-400" />
    </IconButton>
  ) : (
    <div
      className={twMerge("relative shrink-0", AVATAR_UPLOADER_SIZE, className)}>
      {!isImageUploading && (
        <IconButton
          className="absolute -bottom-1 -right-1 z-10 size-6 rounded-full transition-transform hover:scale-125"
          variant="destructive"
          onClick={() => {
            setIsUploaded(false)

            clear()
          }}>
          <IoTrashBin className="size-4 text-white" />
        </IconButton>
      )}

      <div
        className={twMerge(
          "relative flex items-center justify-center overflow-hidden rounded-md",
          AVATAR_UPLOADER_SIZE
        )}>
        <img src={avatarImageUrl} alt={t(LangKey.UserAvatar)} />

        {isImageUploading && (
          <>
            <div className="absolute size-full bg-modalOverlay" />

            <Text
              className="absolute text-white dark:text-white"
              align="center"
              weight="bold">
              {progress}%
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default AvatarUploader
