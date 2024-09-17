import useConnection from "@/hooks/matrix/useConnection"
import {type Credentials, ViewPath} from "@/utils/util"
import {useEffect, useState, type FC} from "react"
import {useNavigate} from "react-router-dom"
import useLocalStorage, {LocalStorageKey} from "@/hooks/util/useLocalStorage"
import ModalHandler from "@/components/ModalHandler"
import RoomContainer from "@/containers/RoomContainer/RoomContainer"
import NavigationSection from "@/containers/NavigationSection/NavigationSection"
import Modal from "@/components/Modal"
import Typography from "@/components/Typography"
import {motion} from "framer-motion"

const AppView: FC = () => {
  const navigate = useNavigate()
  const {connect} = useConnection()
  const [connectionError, setConnectionError] = useState(false)

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
        setConnectionError(false)

        return
      }

      setConnectionError(true)
    })
  }, [connect, credentials, navigate])

  return (
    <>
      {connectionError && (
        <div className="fixed inset-0 z-50 flex size-full w-screen flex-col items-center justify-center bg-modalOverlay">
          <motion.div initial={{scale: 0.5}} animate={{scale: 1}}>
            <Modal
              title="Connection Error"
              actionText="Go to login"
              onAccept={() => {
                navigate(ViewPath.Login)
              }}
              onClose={() => {
                setConnectionError(false)
              }}>
              <Typography>
                Ops we have lost connection with the server, please reload the
                page or login again.
              </Typography>
            </Modal>
          </motion.div>
        </div>
      )}

      <ModalHandler />

      <div className="flex size-full flex-row">
        <NavigationSection />

        <RoomContainer />
      </div>
    </>
  )
}

export default AppView
