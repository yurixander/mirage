import {type ServerListItemProps} from "@/components/ServerListItem"
import useConnection from "@/hooks/matrix/useConnection"
import {getImageUrl} from "@/utils/util"
import {useEffect, useState} from "react"
import {create} from "zustand"

type ActiveSpaceIdStore = {
  activeSpaceId: string | null
  setActiveSpaceId: (spaceId: string | null) => void
}

export const useActiveSpaceIdStore = create<ActiveSpaceIdStore>(set => ({
  activeSpaceId: null,
  setActiveSpaceId: spaceId => {
    set(() => ({activeSpaceId: spaceId}))
  },
}))

const useSpaces = () => {
  const [spaces, setSpace] = useState<ServerListItemProps[]>([])
  const {client, syncState} = useConnection()
  const {activeSpaceId, setActiveSpaceId} = useActiveSpaceIdStore()

  useEffect(() => {
    if (client === null) {
      console.debug("Client is null; cannot fetch spaces.")

      return
    }

    const spacesProp: ServerListItemProps[] = client
      .getRooms()
      .filter(room => room.isSpaceRoom())
      .map(server => {
        return {
          avatarUrl: getImageUrl(server.getMxcAvatarUrl(), client),
          isActive: server.roomId === activeSpaceId,
          tooltip: server.normalizedName,
          onClick: () => {
            setActiveSpaceId(server.roomId)
          },
        }
      })

    setSpace(spacesProp)
  }, [activeSpaceId, client, setActiveSpaceId, syncState])

  return {spaces, activeSpaceId, setActiveSpaceId, client}
}

export default useSpaces
