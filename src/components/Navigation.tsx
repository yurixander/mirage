import "../styles/Navigation.sass"
import {ReactComponent as AppLogo} from "../../public/logo.svg"
import {ReactComponent as AddServerIcon} from "../../public/icons/add-server.svg"
import ServerListItem, {type ServerListItemProps} from "./ServerListItem"
import Tippy from "@tippyjs/react"
import {type FC} from "react"

export type NavigationProps = {
  servers: ServerListItemProps[]
}

const Navigation: FC<NavigationProps> = ({servers}) => {
  return (
    <div className="Navigation">
      <div className="container">
        <AppLogo
          className="logo"
          onClick={() => {
            /* TODO:  Handle click on logo. */
          }}
        />
        <div className="app-name">
          <div>Mirage</div>
          <span className="copyright">©</span>
        </div>
        <div className="divider" />
        <div className="servers">
          {servers.map((server, index) => (
            <ServerListItem key={index} {...server} />
          ))}
          <Tippy
            content="Add server"
            arrow={true}
            inertia={true}
            animation="scale-subtle"
            duration={100}
            placement="right">
            <div
              className="add-server"
              onClick={() => {
                /* TODO: Handle click on Add server. */
              }}>
              <AddServerIcon />
            </div>
          </Tippy>
        </div>
      </div>
    </div>
  )
}

export default Navigation
