import useConnection from "../../hooks/matrix/useConnection"
import {useNavigate} from "react-router-dom"
import {ViewPath} from "@/utils/util"
import {useCallback} from "react"
import {create} from "zustand"

export enum SidebarModals {
  DirectMessages,
  Notifications,
}

type SidebarModalActive = {
  sidebarModalActive: SidebarModals | null
  setActiveSidebarModal: (sidebarModal: SidebarModals) => void
  clearActiveSidebarModal: () => void
}

export const useSidebarModalActiveStore = create<SidebarModalActive>(set => ({
  sidebarModalActive: null,
  setActiveSidebarModal: sidebarModal => {
    set(_state => ({sidebarModalActive: sidebarModal}))
  },
  clearActiveSidebarModal: () => {
    set(_state => ({sidebarModalActive: null}))
  },
}))

const useSidebarActions = () => {
  const {disconnect} = useConnection()
  const navigate = useNavigate()
  const {setActiveSidebarModal} = useSidebarModalActiveStore()

  const onLogout = useCallback(async () => {
    await disconnect()
    navigate(ViewPath.Login)
  }, [disconnect, navigate])

  return {
    onLogout,
    setActiveSidebarModal,
  }
}

export default useSidebarActions
