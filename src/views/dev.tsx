import CreateRoomModal from "@/components/CreateRoomModal"
import {FC, useState} from "react"

const DevelopmentPreview: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <CreateRoomModal
        open={isOpen}
        onOpenChange={setIsOpen}
        onCreateRoom={function (): Promise<void> {
          throw new Error("Function not implemented.")
        }}
      />
    </>
  )
}

export default DevelopmentPreview
