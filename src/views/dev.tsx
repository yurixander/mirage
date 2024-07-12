import Space from "@/containers/NavigationSection/Space"
import {useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [spaceSelected, setSpaceSelected] = useState<string>()

  return (
    <>
      <div className="flex w-max flex-col gap-3 overflow-hidden pt-2">
        <Space
          isSelected={spaceSelected === "space-1"}
          spaceId={"space-1"}
          onClick={() => {
            setSpaceSelected("space-1")
          }}
        />

        <Space
          isSelected={spaceSelected === "space-2"}
          spaceId={"space-2"}
          onClick={() => {
            setSpaceSelected("space-2")
          }}
        />

        <Space
          isSelected={spaceSelected === "space-3"}
          spaceId={"space-3"}
          onClick={() => {
            setSpaceSelected("space-3")
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
