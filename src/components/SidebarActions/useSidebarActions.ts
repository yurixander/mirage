import useConnection from "../../hooks/matrix/useConnection"
import {useNavigate} from "react-router-dom"
import {ViewPath} from "@/utils/util"
import {useCallback, useState} from "react"

export enum SidebarModals {
  DirectMessages,
  Notifications,
}

const useSidebarActions = () => {
  const {disconnect} = useConnection()
  const navigate = useNavigate()
  const [isDirectMessageVisible, setDirectMessageVisible] = useState(false)
  const [isNotificationsVisible, setNotificationsVisible] = useState(false)

  const showAndCloseSidebarModal = useCallback(
    (sidebar: SidebarModals, isVisible: boolean) => {
      switch (sidebar) {
        case SidebarModals.DirectMessages: {
          setDirectMessageVisible(isVisible)
          break
        }
        case SidebarModals.Notifications: {
          setNotificationsVisible(isVisible)
        }
      }
    },
    []
  )

  const onLogout = useCallback(async () => {
    await disconnect()
    navigate(ViewPath.Login)
  }, [disconnect, navigate])

  return {
    onLogout,
    isDirectMessageVisible,
    isNotificationsVisible,
    showAndCloseSidebarModal,
  }
}

export default useSidebarActions
