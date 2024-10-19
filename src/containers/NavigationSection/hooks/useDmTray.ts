import useUsersSearch from "@/hooks/matrix/useUserSearch"
import {getDirectRoomsIds, getPartnerUserIdFromRoomDirect} from "@/utils/rooms"
import {normalizeName} from "@/utils/util"
import type {MatrixClient} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import type {DMRoomData, DMUser} from "../DMTrayPopup"

type UseDMTrayReturnType = {
  isDMLoading: boolean
  userId?: string
  dmRooms: DMRoomData[]
  results: DMUser[] | null
  setQuery: (query: string) => void
  clearResults: () => void
}

const useDmTray = (client: MatrixClient | null): UseDMTrayReturnType => {
  const [userId, setUserId] = useState<string>()
  const {setQuery, results, clearResults} = useUsersSearch(client)
  const [dmRooms, setDMRooms] = useState<DMRoomData[]>([])
  const [isDMLoading, setIsDMLoading] = useState(true)

  // Initially retrieves all direct chat conversations associated
  // with the current user.
  useEffect(() => {
    if (client === null) {
      return
    }

    const userId = client.getUserId()
    setUserId(userId ?? undefined)

    const directRoomIds = getDirectRoomsIds(client)
    const directChatsProps: DMRoomData[] = []

    for (const roomId of directRoomIds) {
      const room = client.getRoom(roomId)

      if (room === null || room.getJoinedMemberCount() !== 2) {
        continue
      }

      directChatsProps.push({
        roomId: room.roomId,
        partnerId: getPartnerUserIdFromRoomDirect(room),
        partnerName: normalizeName(room.name),
      })
    }

    setDMRooms(directChatsProps)
    setIsDMLoading(false)
  }, [client])

  return {
    isDMLoading,
    dmRooms,
    results,
    userId,
    setQuery,
    clearResults,
  }
}

export default useDmTray
