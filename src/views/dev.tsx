import {useState, type FC} from "react"
import Space from "@/containers/NavigationSection/Space"

const DevelopmentPreview: FC = () => {
  const [isTapped, setIsTapped] = useState(false)

  return (
    <>
      <div className="flex size-full flex-col items-center justify-center gap-5">
        <Space
          isSelected={isTapped}
          spaceId={""}
          onSpaceSelected={function (spaceId: string): void {
            setIsTapped(!isTapped)
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
