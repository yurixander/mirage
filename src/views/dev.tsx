import Loader from "@/components/Loader"
import {ScrollArea} from "@/components/ui/scroll-area"
import useIntersection from "@/hooks/util/useIntersection"
import {useEffect, useRef, useState, type FC} from "react"

const DevelopmentPreview: FC = () => {
  const [ref, isIntersecting] = useIntersection()

  return (
    <>
      <div className="h-screen overflow-y-scroll px-10">
        <span className="sticky top-0">Somee{isIntersecting.toString()}</span>

        <div className="h-[800px] w-full bg-red-500"></div>

        <div className="h-[800px] w-full bg-blue-500"></div>

        <div className="mb-1 h-[800px] w-full bg-yellow-500"></div>

        <div ref={ref} />

        {isIntersecting && <Loader text="Loading" />}
      </div>
    </>
  )
}

export default DevelopmentPreview
