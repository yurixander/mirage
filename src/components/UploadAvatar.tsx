import useConnection from "@/hooks/matrix/useConnection"
import {uploadFileToMatrix} from "@/utils/util"
import {useEffect, useState, type FC} from "react"
import {IoCamera, IoTrashBin} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import {useFilePicker} from "use-file-picker"

type UploadAvatarProps = {
  onImageUploaded: (matrixSrc: string) => void
  className?: string
}

const UploadAvatar: FC<UploadAvatarProps> = ({onImageUploaded, className}) => {
  const {client} = useConnection()
  const [isImageUploading, setIsImageUploading] = useState(false)

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

    void uploadFileToMatrix(filesContent[0], client).then(imageUploadedInfo => {
      if (imageUploadedInfo === null) {
        return
      }

      setIsImageUploading(false)
      onImageUploaded(imageUploadedInfo.matrixUrl)
    })
  }, [client, filesContent, onImageUploaded])

  return filesContent.length > 0 ? (
    <div className={twMerge("relative size-16 shrink-0", className)}>
      {!isImageUploading && (
        <IoTrashBin
          size={20}
          color="white"
          aria-hidden="true"
          role="button"
          className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-red-500 p-1 transition-transform hover:scale-125"
          onClick={clear}
        />
      )}

      {isImageUploading || client === null ? (
        <img
          src={filesContent[0].content}
          alt={filesContent[0].name}
          className="rounded-md opacity-50"
        />
      ) : (
        <img
          src={filesContent[0].content}
          alt={filesContent[0].name}
          className="rounded-md"
        />
      )}
    </div>
  ) : (
    <div
      onClick={openFilePicker}
      aria-hidden="true"
      role="button"
      className={twMerge(
        "flex size-16 shrink-0 items-center justify-center rounded-md bg-gray-100",
        className
      )}>
      <IoCamera className="text-slate-400" />
    </div>
  )
}

export default UploadAvatar
