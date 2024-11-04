import {FC, useState} from "react"

import {CreateSpaceButton} from "@/containers/NavigationSection/SpacesNavigation"

import {delay} from "@/utils/util"
import CreateSpaceModal from "@/components/CreateSpaceModal"

const DevelopmentPreview: FC = () => {
  const [open, setIsOpen] = useState(false)

  return (
    <>
      <CreateSpaceButton onCreateSpace={() => setIsOpen(true)} />

      {/* <CreateSpaceModal
        open={open}
        onOpenChange={setIsOpen}
        onCreateSpace={async function (): Promise<void> {}}
        onUploadAvatar={async function (file: File): Promise<string> {
          await delay(1000)

          throw new Error("AAAAAAa")
        }}
      /> */}
    </>
  )
}

export default DevelopmentPreview
