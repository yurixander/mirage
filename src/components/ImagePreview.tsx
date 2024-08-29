import {type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {IoAdd, IoCloseCircle} from "react-icons/io5"
import Button, {ButtonVariant} from "./Button"

export type ImagePreviewProps = {
  imageUrl: string
  imageName: string
  onClear: () => void
  onSendImage: () => void
}

const ImagePreview: FC<ImagePreviewProps> = ({
  imageUrl,
  imageName,
  onClear,
  onSendImage,
}) => {
  return (
    <div className="flex size-messageMaxWidth flex-col rounded border bg-slate-50 shadow-xl">
      <div className="flex h-20 items-center border-b bg-slate-100 p-2">
        <Typography variant={TypographyVariant.Heading} className="w-full">
          Upload Image
        </Typography>
        <IoCloseCircle size={20} role="button" onClick={onClear} />
      </div>
      <div className="flex size-full items-center justify-center rounded p-1">
        <img src={imageUrl} alt="" className="h-72 w-full object-contain" />
      </div>
      <div className="flex h-20 w-full items-center justify-center gap-2 p-1">
        <img
          src={imageUrl}
          alt=""
          className="size-14 rounded border bg-white object-contain shadow"
        />
        <IoAdd
          role="button"
          onClick={() => {}}
          className="size-14 rounded border bg-white text-slate-500 shadow"
        />
      </div>
      <div className="flex h-20 justify-end gap-2 border-t bg-slate-100 p-2">
        <Button
          label="Cancel"
          onClick={onClear}
          className="w-20"
          variant={ButtonVariant.Secondary}
        />
        <Button
          label="Send"
          onClick={() => {
            onSendImage()
            onClear()
          }}
          className="w-20"
          variant={ButtonVariant.Primary}
        />
      </div>
    </div>
  )
}

export default ImagePreview
