import {type FC} from "react"
import {ScrollArea} from "@/components/ui/scroll-area"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <ScrollArea type="scroll" className="h-full w-[350px] p-4">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester. And then, one day, the people of the kingdom discovered
        that the jokes left by Jokester were so funny that they couldn't help
        but laugh. And once they started laughing, they couldn't stop.
      </ScrollArea>
    </>
  )
}

export default DevelopmentPreview
