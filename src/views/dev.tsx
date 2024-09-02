import {Button} from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import DirectChatsPopup from "@/containers/NavigationSection/DirectChatsPopup"

import {type FC} from "react"
import {IoNotifications} from "react-icons/io5"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-end justify-center">
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <Button
              className="text-slate-400 hover:text-slate-800"
              variant="ghost"
              size="icon">
              <IoNotifications size={20} />
            </Button>
          </HoverCardTrigger>

          <HoverCardContent asChild side="right">
            <div className="w-max">
              <DirectChatsPopup />
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  )
}

export default DevelopmentPreview
