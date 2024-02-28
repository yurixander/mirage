import {useMemo, type FC} from "react"
import ServerListItem from "./ServerListItem"
import useSpaces from "@/hooks/matrix/useSpaces"
import {twMerge} from "tailwind-merge"
import AppLogo from "./AppLogo"
import {getImageUrl} from "@/utils/util"
import AddServerIcon from "./AddServerIcon"

export type NavigationProps = {
  className?: string
}

const Navigation: FC<NavigationProps> = ({className}) => {
  const {spaces, activeSpaceId, setActiveSpaceId, client} = useSpaces()

  const spaceElements = useMemo(() => {
    if (client === null) return

    return spaces?.map((server, index) => (
      <ServerListItem
        avatarUrl={getImageUrl(server.getMxcAvatarUrl(), client)}
        key={index}
        isActive={server.roomId === activeSpaceId}
        onClick={() => {
          setActiveSpaceId(server.roomId)
        }}
        tooltip={server.normalizedName}
      />
    ))
  }, [activeSpaceId, client, setActiveSpaceId, spaces])

  return (
    <div
      className={twMerge(
        "h-full min-w-max grow overflow-y-scroll scrollbar-hide",
        className
      )}>
      <div className="flex flex-col">
        <div className="m-2 flex flex-col items-center">
          <AppLogo onClick={() => {}} />

          <div className="flex items-end font-iowan">
            <div>Mirage</div>

            <span className="ml-[2px] text-xs italic">©</span>
          </div>
        </div>

        <div className="m-2 mx-3 h-[1px] bg-neutral-300" />

        <div className="flex flex-col items-start justify-center gap-4">
          <ServerListItem
            isActive={activeSpaceId === null}
            onClick={() => {
              setActiveSpaceId(null)
            }}
            tooltip="All rooms"
          />
          {spaceElements}
          <div className="flex w-full justify-center">
            <AddServerIcon
              className="size-serverSize"
              onClick={function (): void {
                throw new Error("Function not implemented.")
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
