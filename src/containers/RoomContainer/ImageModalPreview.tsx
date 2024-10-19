import ImagePreview from "@/components/ImagePreview"
import type {FC} from "react"
import {createPortal} from "react-dom"

export type ImageModalPreviewProps = {
  imageUrl: string
  imageName: string
  onClear: () => void
  onSendImage: () => void
}

const ImageModalPreview: FC<ImageModalPreviewProps> = ({
  imageName,
  imageUrl,
  onSendImage,
  onClear,
}) => {
  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-50 flex size-full w-screen flex-col items-center justify-center bg-modalOverlay">
          <ImagePreview
            imageName={imageName}
            imageUrl={imageUrl}
            onSendImage={onSendImage}
            onClear={onClear}
          />
        </div>,
        document.body
      )}
    </>
  )
}

export default ImageModalPreview
