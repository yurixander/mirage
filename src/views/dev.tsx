import AttachSource from "@/containers/RoomContainer/AttachSource"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center">
        <AttachSource
          onPickFile={function (file: File): void {
            throw new Error("Function not implemented.")
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
