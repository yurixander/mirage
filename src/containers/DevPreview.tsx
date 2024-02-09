import Roster, {RosterUserCategory} from "@/components/Roster"
import {UserStatus} from "@/components/UserProfile"
import RoomsList from "@/containers/RoomsList"
import useCachedCredentials from "@/hooks/matrix/useCachedCredentials"
import useConnection from "@/hooks/matrix/useConnection"
import {useEffect, type FC} from "react"

const DevPreview: FC = () => {
  const {connect} = useConnection()
  const {credentials} = useCachedCredentials()

  // Connect on startup.
  useEffect(() => {
    if (credentials === null) {
      return
    }

    void connect(credentials)
  }, [connect, credentials])

  return (
    <div className="flex">
      <RoomsList />
      <Roster
        className="ml-auto"
        users={[
          {
            category: RosterUserCategory.Member,
            userProfileProps: {
              displayName: "Emerald branch",
              status: UserStatus.Offline,
              text: "Hello",
              displayNameColor: "#D5D5D5",
            },
          },
        ]}
      />
    </div>
  )
}

export default DevPreview
