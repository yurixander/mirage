import Loader from "@/components/Loader"
import {ScrollArea, SmartScrollArea} from "@/components/ui/scroll-area"
import useIntersection from "@/hooks/util/useIntersection"
import {useEffect, useRef, useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  return (
    <>
      <div className="flex gap-32">
        <div className="grow bg-black"></div>

        <div className="flex flex-col gap-10">
          <div>Heeeee</div>

          <SmartScrollArea
            className="h-screen grow"
            endScrollChange={setIsIntersecting}>
            <span className="sticky top-0">
              Somee{isIntersecting.toString()}
            </span>
            <div className="h-[800px] w-full bg-red-500"></div>
            <div className="h-[800px] w-full bg-blue-500"></div>
            <div className="mb-1 h-[800px] w-full bg-yellow-500"></div>
          </SmartScrollArea>
        </div>
      </div>
    </>
  )
}

export default DevelopmentPreview
