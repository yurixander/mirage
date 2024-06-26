import useConnection from "@/hooks/matrix/useConnection"
import {getNotificationsFromLocalStorage} from "@/utils/notifications"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {useEffect} from "react"

export enum UserRoomMembership {
  Invite,
  Join,
  Leave,
  Ban,
  Knock,
}

export type MembershipNotificationData = {
  roomId: string
  membership: UserRoomMembership
}

const transformMembership: {[key in string]: UserRoomMembership} = {
  [KnownMembership.Ban]: UserRoomMembership.Ban,
  [KnownMembership.Invite]: UserRoomMembership.Invite,
  [KnownMembership.Join]: UserRoomMembership.Join,
  [KnownMembership.Leave]: UserRoomMembership.Leave,
  [KnownMembership.Knock]: UserRoomMembership.Knock,
}

const useNotifications = () => {
  const {client} = useConnection()

  useEffect(() => {
    if (client === null) {
      return
    }

    const cachedMembershipNotifications = getNotificationsFromLocalStorage()
    const rooms = client.getRooms()

    for (const room of rooms) {
      const newMembershipNotification: MembershipNotificationData = {
        roomId: room.roomId,
        membership: transformMembership[room.getMyMembership()],
      }

      // TODO: Check `cachedMembershipNotifications` width `newMembershipNotification`.
    }
  }, [client])

  return {}
}

export default useNotifications
