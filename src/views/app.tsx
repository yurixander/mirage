import ChatContainer from "@/components/ChatContainer"
import Navigation from "@/components/Navigation"
import SidebarActions from "@/components/SidebarActions"
import Roster from "@/components/Roster"
import SearchBar, {type SearchResult} from "@/components/SearchBar"
import UserBar from "@/components/UserBar"
import RoomsList from "@/containers/RoomsList"
import useCachedCredentials from "@/hooks/matrix/useCachedCredentials"
import useConnection from "@/hooks/matrix/useConnection"
import {ViewPath} from "@/utils/util"
import {useEffect, type FC} from "react"
import {useNavigate} from "react-router-dom"

const AppView: FC = () => {
  const navigate = useNavigate()
  const {connect, disconnect} = useConnection()
  const {credentials} = useCachedCredentials()

  // Connect on startup.
  useEffect(() => {
    if (credentials === null) {
      return
    }

    void connect(credentials).then(async connectedAndSynced => {
      if (connectedAndSynced) {
        return
      }

      navigate(ViewPath.Login)
    })
  }, [connect, credentials, disconnect, navigate])

  return (
    <div className="flex size-full flex-row">
      <div className="flex flex-col items-center">
        <Navigation className="mb-auto" />

        <SidebarActions
          className="p-4"
          onViewDirectMessages={() => {
            throw new Error("View direct messages not implemented.")
          }}
          onViewCalls={() => {
            throw new Error("View calls not implemented.")
          }}
          onViewNotifications={() => {
            throw new Error("View notifications not implemented.")
          }}
          onOpenExtensions={() => {
            throw new Error("Open extensions not implemented.")
          }}
          onLogout={() => {
            void disconnect()
            navigate(ViewPath.Login)
          }}
        />
      </div>

      <div className="flex flex-col border border-solid border-stone-200">
        <div className="border-b-[1px] border-solid border-b-stone-200">
          <SearchBar
            className="m-2"
            onQueryChange={function (query: string): SearchResult[] {
              throw new Error("Function not implemented.")
            }}
          />
        </div>

        <RoomsList />
        <UserBar className="border-t border-t-stone-200 p-3" />
      </div>

      <ChatContainer className="w-full grow" />
      <Roster className="max-w-max grow" />
    </div>
  )
}

export default AppView
