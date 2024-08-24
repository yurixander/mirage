import ChooseFileButton from "@/containers/RoomContainer/ChooseFileButton"
import {useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [imgUrl, setImgUrl] = useState("")

  return (
    <>
      <div className="flex size-full items-center justify-center">
        <ChooseFileButton
          onPickFile={file => {
            setImgUrl(URL.createObjectURL(file))
          }}
        />

        <img src={imgUrl} alt="Lool" />
      </div>
    </>
  )
}

export default DevelopmentPreview
