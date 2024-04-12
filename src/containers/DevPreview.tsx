import {useState, type FC} from "react"
import ImageModal from "./ChatContainer/ImageModal"
import Modal from "@/components/Modal"

const DevelopmentPreview: FC = () => {
  const [isShow, setImageModal] = useState(true)

  return (
    <>
      <Modal
        children={
          <ImageModal
            imageEventId="dwd"
            onClose={() => {
              setImageModal(false)
            }}
            imageUrl="https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        }
        isVisible={isShow}
      />
    </>
  )
}

export default DevelopmentPreview
