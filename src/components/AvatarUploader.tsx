import {uploadImageToMatrix} from "@/utils/util"
import {useEffect, useState, type FC} from "react"
import {IoCamera, IoTrashBin} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import {useFilePicker} from "use-file-picker"
import Typography, {TypographyVariant} from "./Typography"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"

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

  const {openFilePicker, filesContent, clear} = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  })

  useEffect(() => {
    if (client === null || filesContent.length <= 0) {
      return
    }

    setIsImageUploading(true)

    void uploadImageToMatrix(filesContent[0], client, setImagePercent)
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
  }, [client, filesContent, onAvatarUploaded])

  return filesContent.length > 0 ? (
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

            <img src={filesContent[0].content} alt={filesContent[0].name} />

            <Typography
              variant={TypographyVariant.BodySmall}
              className="absolute font-bold text-white">
              {imagePercent}%
            </Typography>
          </>
        ) : (
          <img src={filesContent[0].content} alt={filesContent[0].name} />
        )}
      </div>
    </div>
  ) : (
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
  )
}

export default AvatarUploader
