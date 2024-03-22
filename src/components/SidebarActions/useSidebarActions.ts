import useConnection from "../../hooks/matrix/useConnection"
import {useNavigate} from "react-router-dom"
import {ViewPath} from "@/utils/util"
import {useCallback} from "react"

const useSidebarActions = () => {
  const {disconnect} = useConnection()
  const navigate = useNavigate()

  const onLogout = useCallback(async () => {
    await disconnect()
    navigate(ViewPath.Login)
  }, [disconnect, navigate])

  return {onLogout}
}

export default useSidebarActions
