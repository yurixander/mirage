import {type FC} from "react"
import {Button} from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {IoCopy, IoNotifications, IoSearch} from "react-icons/io5"
import Typography, {TypographyVariant} from "@/components/Typography"
import Input from "@/components/Input"

const DMTrayPopup: FC = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger>
        <Button
          className="text-slate-400 hover:text-slate-800"
          variant="ghost"
          size="icon">
          <IoNotifications size={24} />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent asChild side="right">
        <div className="z-50 m-1 flex h-[520px] w-[480px] flex-col gap-3 overflow-hidden rounded-md border border-slate-300 md:h-[620px]">
          <Typography variant={TypographyVariant.Heading}>
            Direct Rooms
          </Typography>

          <div className="flex flex-col gap-2">
            <Typography className="text-black">
              Start a conversation with someone using their name or username
              (@username:mirage.org).
            </Typography>

            <Input
              onValueChange={() => {}}
              Icon={IoSearch}
              placeholder="Enter name or username"
            />

            <div className="flex max-h-72 flex-col gap-2 overflow-y-auto"></div>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <Typography className="text-black">
              Some suggestions may not be shown for privacy reasons. If you
              don´t find who you´re looking for, send them your invitation link
              below.
            </Typography>

            <div className="flex h-10 items-center justify-between rounded border border-neutral-300 bg-neutral-50 px-2">
              <Typography
                variant={TypographyVariant.BodyMedium}
                className="text-blue-600">
                https://matrix.to/#/crissxxl
              </Typography>

              <Button
                className="text-slate-300 hover:bg-transparent hover:text-slate-600"
                variant="ghost"
                size="icon">
                <IoCopy />
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default DMTrayPopup
