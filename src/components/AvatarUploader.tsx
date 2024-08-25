import {uploadImageToMatrix} from "@/utils/util"
import {useEffect, useState, type FC} from "react"
import {IoCamera, IoTrashBin} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import Typography, {TypographyVariant} from "./Typography"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useFilePicker, {SourceType} from "@/hooks/util/useFilePicker"

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
  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const openFilePicker = useFilePicker(SourceType.Image, file => {
    const imageUrl = URL.createObjectURL(file)

    setImageFile(file)
    setAvatarImageUrl(imageUrl)
  })

  useEffect(() => {
    if (client === null || imageFile === null) {
      return
    }

    setIsImageUploading(true)

    void uploadImageToMatrix(imageFile, client, setImagePercent)
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
  }, [client, imageFile, onAvatarUploaded])

  return avatarImageUrl === null ? (
    <div
      onClick={openFilePicker}
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
          <img src={avatarImageUrl} alt="User avatar" />
        )}
      </div>
    </div>
  )
}

export default AvatarUploader
