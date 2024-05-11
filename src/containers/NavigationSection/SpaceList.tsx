import Typography, {TypographyVariant} from "@/components/Typography"
import {type FC} from "react"
import React from "react"
import * as emoji from "node-emoji"

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
}

const SpaceList: FC<SpaceListProps> = ({spaces}) => {
  return (
    <div className="flex flex-col gap-6">
      {spaces.map(space => (
        <Details title={space.name} key={space.spaceId}>
          <div className="flex w-max max-w-44 flex-col gap-1">
            {space.childRooms.map(room => (
              <Room
                key={room.roomId}
                roomName={room.roomName}
                tagEmoji={emoji.random().emoji}
              />
            ))}
          </div>
        </Details>
      ))}
    </div>
  )
}

const Room: FC<{roomName: string; tagEmoji: string}> = ({
  roomName,
  tagEmoji,
}) => {
  return (
    <div className="flex gap-2 rounded-sm p-1 hover:bg-gray-100">
      <Typography variant={TypographyVariant.P}>{tagEmoji}</Typography>

      <Typography
        variant={TypographyVariant.P}
        className="line-clamp-1 font-bold text-slate-500">
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
