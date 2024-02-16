import ChatContainer from "@/components/ChatContainer"
import Navigation from "@/components/Navigation"
import QuickActions from "@/components/QuickActions"
import Roster from "@/components/Roster"
import SearchBar, {type SearchResult} from "@/components/SearchBar"
import UserBar from "@/components/UserBar"
import {UserStatus} from "@/components/UserProfile"
import RoomsList from "@/containers/RoomsList"
import useCachedCredentials from "@/hooks/matrix/useCachedCredentials"
import useConnection from "@/hooks/matrix/useConnection"
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

    void connect(credentials)
  }, [connect, credentials])

  return (
    <div className="flex size-full flex-row">
      <div className="flex flex-col items-center">
        <Navigation className="mb-auto" />

        <QuickActions
          className="p-4"
          onViewDirectMessages={function (): void {
            throw new Error("Function not implemented.")
          }}
          onViewCalls={function (): void {
            throw new Error("Function not implemented.")
          }}
          onViewNotifications={function (): void {
            throw new Error("Function not implemented.")
          }}
          onOpenExtensions={function (): void {
            throw new Error("Function not implemented.")
          }}
          onLogout={function (): void {
            void disconnect()
            navigate("/login")
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
        <UserBar
          className="border-t border-t-stone-200 p-3"
          username={"@thecriss"}
          displayName={"Tokyoto"}
          displayNameColor={"#5CC679"}
          status={UserStatus.Online}
        />
      </div>

      <ChatContainer className="w-full" />
      <Roster className="w-max" />
    </div>
  )
}

export default AppView
