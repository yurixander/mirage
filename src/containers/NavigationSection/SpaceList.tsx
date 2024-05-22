import {type FC} from "react"
import React from "react"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import useSpaces from "./hooks/useSpaces"
import RoomChildList from "./RoomChildList"

export type PartialRoom = {
  roomId: string
  roomName: string
}

export type Space = {
  name: string
  spaceId: string
}

const SpaceList: FC<{className?: string}> = ({className}) => {
  const {spaces} = useSpaces()

  return (
    <div
      className={twMerge(
        "flex size-full flex-col gap-6 overflow-y-auto scroll-smooth ",
        className
      )}>
      {spaces.length > 0 ? (
        spaces.map(space => (
          <Details title={space.name} key={space.spaceId}>
            <RoomChildList spaceId={space.spaceId} />
          </Details>
        ))
      ) : (
        <Loader text="Charging Spaces..." />
      )}
    </div>
  )
}

const Details: FC<{title: string; children?: React.ReactNode}> = ({
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
