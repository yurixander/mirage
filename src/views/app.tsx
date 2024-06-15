import ChatContainer from "@/containers/ChatContainer/ChatContainer"
import Roster from "@/containers/Roster/Roster"
import useConnection from "@/hooks/matrix/useConnection"
import {type Credentials, ViewPath} from "@/utils/util"
import {useEffect, type FC} from "react"
import {useNavigate} from "react-router-dom"
import useLocalStorage, {LocalStorageKey} from "@/hooks/util/useLocalStorage"
import NavigationSection from "@/containers/NavigationSection"
import ModalHandler from "@/components/ModalHandler"

const AppView: FC = () => {
  const navigate = useNavigate()
  const {connect} = useConnection()

  const {value: credentials} = useLocalStorage<Credentials>(
    LocalStorageKey.Credentials
  )

  // Connect on startup, or redirect to login page if no credentials
  // are found in local storage.
  useEffect(() => {
    // No credentials found, redirect to login page.
    if (credentials === null) {
      navigate(ViewPath.Login)

      return
    }

    void connect(credentials).then(async isConnectedAndSynced => {
      if (isConnectedAndSynced) {
        return
      }

      // Failed to connect, redirect to login page.
      navigate(ViewPath.Login)
    })
  }, [connect, credentials, navigate])

  return (
    <>
      <ModalHandler />

      <div className="flex size-full flex-row">
        <NavigationSection />

        <ChatContainer className="w-full grow" />
        <Roster className="grow" />
      </div>
    </>
  )
}

export default AppView
