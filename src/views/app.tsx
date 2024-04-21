import ChatContainer from "@/containers/ChatContainer/ChatContainer"
import Navigation from "@/components/Navigation"
import SidebarActions from "@/components/SidebarActions/SidebarActions"
import Roster from "@/components/Roster"
import SearchBar, {type SearchResult} from "@/components/SearchBar"
import UserBar from "@/components/UserBar"
import RoomsList from "@/containers/RoomsList"
import useConnection from "@/hooks/matrix/useConnection"
import {type Credentials, ViewPath} from "@/utils/util"
import {useEffect, type FC} from "react"
import {useNavigate} from "react-router-dom"
import useLocalStorage, {LocalStorageKeys} from "@/hooks/util/useLocalStorage"

const AppView: FC = () => {
  const navigate = useNavigate()
  const {connect} = useConnection()
  const {cachedValue: credentials} = useLocalStorage<Credentials>(
    LocalStorageKeys.Credentials
  )

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
  }, [connect, credentials, navigate])

  return (
    <div className="flex size-full flex-row">
      <div className="flex flex-col items-center">
        <Navigation className="mb-auto" />

        <SidebarActions className="p-4" />
      </div>

      <div className="flex flex-col border border-stone-200">
        <div className="border-b border-b-stone-200">
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
