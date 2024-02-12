import ChatContainer from "@/components/ChatContainer"
import Navigation from "@/components/Navigation"
import Roster from "@/components/Roster"
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
      <Navigation />
      <RoomsList />
      <ChatContainer />
      <Roster className="min-w-max" />
    </div>
  )
}

export default DevPreview
