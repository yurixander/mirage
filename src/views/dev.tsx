import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {useEffect, useRef, type FC} from "react"
import {IoChevronUp} from "react-icons/io5"

const DevelopmentPreview: FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight
    }
  }, [])

  const handleScrollToTop = (): void => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="mx-auto flex h-[400px] w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-200">
      <ScrollArea ref={scrollContainerRef}>
        <div className="flex-1 space-y-4 p-4">
          {Array.from({length: 20}).map((_, index) => (
            <div key={index} className="rounded-lg bg-gray-100 p-4">
              <h3 className="font-semibold">Item {20 - index}</h3>
              <p>This is some sample content for item {20 - index}.</p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-gray-200 bg-white p-4">
        <Button
          onClick={handleScrollToTop}
          className="flex w-full items-center justify-center">
          <IoChevronUp className="mr-2 size-4" />
          Scroll to Top
        </Button>
      </div>
    </div>
  )
}

export default DevelopmentPreview
