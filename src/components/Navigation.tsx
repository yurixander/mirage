import {useMemo, useState, type FC} from "react"
import ServerListItem from "./ServerListItem"
import useSpaces from "@/hooks/matrix/useSpaces"
import {twMerge} from "tailwind-merge"
import {StaticAssetPath, getImageUrl} from "@/utils/util"
import {ReactSVG} from "react-svg"
import CreateRoom from "./CreateRoom"
import Modal from "./Modal"

export type NavigationProps = {
  className?: string
}

const Navigation: FC<NavigationProps> = ({className}) => {
  const {spaces, activeSpaceId, setActiveSpaceId, client} = useSpaces()

  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    useState(false)

  const spaceElements = useMemo(() => {
    if (client === null || spaces === null) {
      return []
    }

    return spaces.map(server => (
      <ServerListItem
        avatarUrl={getImageUrl(server.getMxcAvatarUrl(), client)}
        key={server.roomId}
        isActive={server.roomId === activeSpaceId}
        tooltip={server.normalizedName}
        onClick={() => {
          setActiveSpaceId(server.roomId)
        }}
      />
    ))
  }, [activeSpaceId, client, setActiveSpaceId, spaces])

  return (
    <>
      <Modal
        children={
          <CreateRoom
            onClose={() => {
              setIsCreateRoomModalVisible(false)
            }}
          />
        }
        isVisible={isCreateRoomModalVisible}
      />

      <div
        className={twMerge(
          "h-full min-w-max grow overflow-y-scroll scrollbar-hide",
          className
        )}>
        <div className="flex flex-col">
          <div className="m-2 flex flex-col items-center">
            <ReactSVG src={StaticAssetPath.AppLogo} />

            <div className="flex items-end font-iowan">
              <div>Mirage</div>

              <span className="ml-[2px] text-xs italic">©</span>
            </div>
          </div>

          <div className="m-2 mx-3 h-px bg-neutral-300" />

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
              <ReactSVG
                className="size-serverSize cursor-pointer"
                src={StaticAssetPath.AddServerIcon}
                onClick={() => {
                  setIsCreateRoomModalVisible(true)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
