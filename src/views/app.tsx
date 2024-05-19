import ChatContainer from "@/containers/ChatContainer/ChatContainer"
import Roster from "@/containers/Roster/Roster"
import useConnection from "@/hooks/matrix/useConnection"
import {type Credentials, ViewPath} from "@/utils/util"
import {useEffect, type FC} from "react"
import {useNavigate} from "react-router-dom"
import useLocalStorage, {LocalStorageKeys} from "@/hooks/util/useLocalStorage"
import NavigationSection from "@/containers/NavigationSection"

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
      <NavigationSection />

      <ChatContainer className="w-full grow" />
      <Roster className="grow" />
    </div>
  )
}

export default AppView
