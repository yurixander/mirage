import {type FC} from "react"
import ServerListItem from "./ServerListItem"
import useSpaces from "@/hooks/matrix/useSpaces"
import {twMerge} from "tailwind-merge"
import AppLogo from "./AppLogo"

export type NavigationProps = {
  className?: string
}

const Navigation: FC<NavigationProps> = ({className}) => {
  const {spaces, activeSpaceId, setActiveSpaceId} = useSpaces()

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
          {spaces?.map((server, index) => (
            <ServerListItem
              key={index}
              isActive={server.roomId === activeSpaceId}
              onClick={() => {
                setActiveSpaceId(server.roomId)
              }}
              tooltip={server.normalizedName}
            />
          ))}
          <div
            className="cursor-pointer"
            onClick={() => {
              /* TODO: Handle click on Add server. */
            }}>
            {/* <AddServerIcon /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
