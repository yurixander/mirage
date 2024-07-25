import {type FC} from "react"
import {createPortal} from "react-dom"
import Button, {ButtonVariant} from "@/components/Button"

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
          <div className="flex max-h-[600px] max-w-xl flex-col gap-4 rounded-xl bg-slate-50 p-6 px-8 shadow-md">
            <img
              className="h-auto w-full rounded-lg object-cover shadow-md"
              src={imageUrl}
              alt={imageName}
            />
            <div className="flex w-full items-center justify-end gap-1">
              <Button
                variant={ButtonVariant.Secondary}
                onClick={onClear}
                label="Cancel"
              />

              <Button
                variant={ButtonVariant.Primary}
                label="Send Image"
                onClick={() => {
                  onSendImage()
                  onClear()
                }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default ImageModalPreview
