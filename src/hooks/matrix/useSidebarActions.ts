import useConnection from "./useConnection"
import {useNavigate} from "react-router-dom"
import {ViewPath} from "@/utils/util"

const useSidebarActions = () => {
  const {disconnect} = useConnection()
  const navigate = useNavigate()

  const onLogout = async () => {
    await disconnect()
    navigate(ViewPath.Login)
  }

  return {onLogout}
}

export default useSidebarActions
