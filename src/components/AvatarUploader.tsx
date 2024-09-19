import {uploadImageToMatrix} from "@/utils/util"
import {useEffect, useMemo, useState, type FC} from "react"
import {IoCamera, IoTrashBin} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import Typography, {TypographyVariant} from "./Typography"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useFilePicker from "@/hooks/util/useFilePicker"
import {LangKey} from "@/lang/allKeys"
import useTranslation from "@/hooks/util/useTranslation"
import {IconButton} from "./ui/button"

type UploadAvatarProps = {
  onAvatarUploaded: (matrixSrc: string) => void
  className?: string
}

const AVATAR_UPLOADER_SIZE = "size-16"

const AvatarUploader: FC<UploadAvatarProps> = ({
  onAvatarUploaded,
  className,
}) => {
  const client = useMatrixClient()
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [imagePercent, setImagePercent] = useState(0)
  const {contentPicked, onPickFile, clear} = useFilePicker(false, "image/*")
  const {t} = useTranslation()

  const avatarImageUrl: string | null = useMemo(() => {
    if (
      contentPicked === null ||
      contentPicked.isMultiple ||
      contentPicked.pickerResult === null
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

  useEffect(() => {
    if (
      client === null ||
      contentPicked === null ||
      contentPicked.isMultiple ||
      contentPicked.pickerResult === null
    ) {
      return
    }

    setIsImageUploading(true)

    void uploadImageToMatrix(
      contentPicked.pickerResult,
      client,
      setImagePercent
    )
      .then(imageUploadedInfo => {
        if (imageUploadedInfo === null) {
          // TODO: Send here notification that the image has not been uploaded.

          throw new Error("Image upload failed")
        }

        setIsImageUploading(false)
        onAvatarUploaded(imageUploadedInfo.matrixUrl)
      })
      .catch(_error => {
        // TODO: Send here notification that the image has not been uploaded.
      })
  }, [client, contentPicked, onAvatarUploaded])

  return avatarImageUrl === null ? (
    <IconButton
      onClick={onPickFile}
      className={twMerge(
        "flex shrink-0 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-100",
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
          onClick={clear}>
          <IoTrashBin className="size-4 text-white" />
        </IconButton>
      )}

      <div
        className={twMerge(
          "relative flex items-center justify-center overflow-hidden rounded-md",
          AVATAR_UPLOADER_SIZE
        )}>
        {isImageUploading ? (
          <>
            <div className="absolute size-full bg-modalOverlay" />

            <img src={avatarImageUrl} alt="User profile avatar" />

            <Typography
              variant={TypographyVariant.BodySmall}
              className="absolute font-bold text-white">
              {imagePercent}%
            </Typography>
          </>
        ) : (
          <img src={avatarImageUrl} alt={t(LangKey.UserAvatar)} />
        )}
      </div>
    </div>
  )
}

export default AvatarUploader
