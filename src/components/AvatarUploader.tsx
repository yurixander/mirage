import {uploadImageToMatrix} from "@/utils/util"
import {useEffect, useMemo, useState, type FC} from "react"
import {IoCamera, IoTrashBin} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import Typography, {TypographyVariant} from "./Typography"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useFilePicker from "@/hooks/util/useFilePicker"
import {useTranslation} from "react-i18next"

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
    <div
      onClick={onPickFile}
      aria-hidden="true"
      role="button"
      className={twMerge(
        "flex shrink-0 items-center justify-center rounded-md bg-gray-100",
        AVATAR_UPLOADER_SIZE,
        className
      )}>
      <IoCamera className="text-slate-400" />
    </div>
  ) : (
    <div
      className={twMerge("relative shrink-0", AVATAR_UPLOADER_SIZE, className)}>
      {!isImageUploading && (
        <IoTrashBin
          size={20}
          color="white"
          aria-hidden="true"
          role="button"
          className="absolute -bottom-1 -right-1 z-10 cursor-pointer rounded-full bg-red-500 p-1 transition-transform hover:scale-125"
          onClick={clear}
        />
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
          <img src={avatarImageUrl} alt={t("User avatar")} />
        )}
      </div>
    </div>
  )
}

export default AvatarUploader
