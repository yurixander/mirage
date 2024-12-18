import useUsersSearch from "@/hooks/matrix/useUserSearch"
import {type MatrixClient} from "matrix-js-sdk"
import {useEffect, useState} from "react"
import {type DMUser, type DMRoomData} from "../DMTrayPopup"
import {getDirectRoomsIds, getPartnerUserIdFromRoomDirect} from "@/utils/rooms"
import {normalizeName} from "@/utils/util"

type UseDMTrayReturnType = {
  isDMLoading: boolean
  userId?: string
  dmRooms: DMRoomData[]
  results: DMUser[] | null
  setDebouncedQuery: (query: string) => void
  clearResults: () => void
}

const useDmTray = (client: MatrixClient | null): UseDMTrayReturnType => {
  const [userId, setUserId] = useState<string>()
  const {setDebouncedQuery, results, clearResults} = useUsersSearch(client)
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
    setDebouncedQuery,
    clearResults,
  }
}

export default useDmTray
