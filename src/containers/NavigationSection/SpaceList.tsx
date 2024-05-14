import Typography, {TypographyVariant} from "@/components/Typography"
import {type FC} from "react"
import React from "react"
import {twMerge} from "tailwind-merge"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {emojiRandom} from "@/utils/util"

export type PartialRoom = {
  roomId: string
  roomName: string
}

export type Space = {
  name: string
  spaceId: string
  childRooms: PartialRoom[]
}

export type SpaceListProps = {
  spaces: Space[]
  className?: string
}

const SpaceList: FC<SpaceListProps> = ({spaces, className}) => {
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()

  return (
    <div className={twMerge("flex size-full flex-col gap-6", className)}>
      {spaces.length > 0 ? (
        spaces.map(space => (
          <Details title={space.name} key={space.spaceId}>
            <div className="flex flex-col gap-1">
              {space.childRooms.map(room => (
                <Room
                  key={room.roomId}
                  roomName={room.roomName}
                  tagEmoji={emojiRandom()}
                  isSelected={activeRoomId === room.roomId}
                  onClick={() => {
                    setActiveRoomId(room.roomId)
                  }}
                />
              ))}
            </div>
          </Details>
        ))
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2">
          <div className="size-8 animate-rotation rounded-full border-4 border-white border-t-slate-500" />

          <Typography>Charging Spaces...</Typography>
        </div>
      )}
    </div>
  )
}

const Room: FC<{
  roomName: string
  tagEmoji: string
  isSelected?: boolean
  onClick: () => void
}> = ({roomName, tagEmoji, onClick, isSelected = false}) => {
  return (
    <div
      className={twMerge(
        "flex gap-2 rounded-md p-1 px-2",
        isSelected ? "bg-purple-500" : "hover:bg-slate-200"
      )}
      onClick={onClick}
      role="button"
      aria-hidden="true">
      <Typography variant={TypographyVariant.P}>{tagEmoji}</Typography>

      <Typography
        variant={TypographyVariant.P}
        className={twMerge(
          "line-clamp-1 font-bold",
          isSelected ? "text-white" : "text-slate-500"
        )}>
        {roomName}
      </Typography>
    </div>
  )
}

const Details: FC<{title: string; children?: React.JSX.Element}> = ({
  title,
  children,
}) => {
  return (
    <details className="cursor-pointer">
      <summary className="text-sm font-bold text-slate-500">
        {title.toUpperCase()}
      </summary>

      <div className="pt-2">{children}</div>
    </details>
  )
}

export default SpaceList
