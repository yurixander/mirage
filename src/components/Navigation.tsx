import {type FC} from "react"
import ServerListItem from "./ServerListItem"
import useSpaces from "@/hooks/matrix/useSpaces"

const Navigation: FC = () => {
  const {spaces, activeSpaceId, setActiveSpaceId} = useSpaces()

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col items-center justify-center">
        {/* <AppLogo className="cursor-pointer" onClick={() => {}} /> */}

        <div className="flex items-end font-iowan">
          <div>Mirage</div>

          <span className="ml-[2px] text-xs italic">©</span>
        </div>

        <div className="m-4 h-[1px] w-full bg-neutral-300" />

        <div className="flex flex-col items-end justify-center gap-4">
          <ServerListItem
            isActive={activeSpaceId === undefined}
            onClick={() => {
              setActiveSpaceId(undefined)
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
