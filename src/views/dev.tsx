import {SpacesNavigation} from "@/containers/NavigationSection/SpacesNavigation"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      {/* <Spaces
        spaces={spacesDummy}
        isLoading={false}
        spaceSelected={space}
        onCreateSpace={function (): void {
          throw new Error("Function not implemented.")
        }}
        onSpaceSelected={setSpace}
      /> */}

      <SpacesNavigation />
    </>
  )
}

export default DevelopmentPreview
