import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <div className="flex size-full flex-col gap-4 p-4">
      <div className="h-24 w-full shrink-0 bg-black"></div>

      <div className="size-full bg-red-500"></div>

      <div className="h-24 w-full shrink-0 bg-black"></div>
    </div>
  )
}

export default DevelopmentPreview
