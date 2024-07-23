import useConnection from "../../../hooks/matrix/useConnection"
import {useNavigate} from "react-router-dom"
import {ViewPath} from "@/utils/util"

type UseSidebarActions = {
  onLogout: () => void
}

const useSidebarActions = (): UseSidebarActions => {
  const {disconnect} = useConnection()
  const navigate = useNavigate()

  const onLogout = (): void => {
    void disconnect()
      .then(() => {
        navigate(ViewPath.Login)
      })
      .catch(error => {
        // TODO: Handle error here.

        throw new Error(String(error))
      })
  }

  return {
    onLogout,
  }
}

export default useSidebarActions
