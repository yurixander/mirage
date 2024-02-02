import Tippy from "@tippyjs/react"
import {type FC} from "react"
import {ReactComponent as AddServerIcon} from "../../public/icons/add-server.svg"
import {ReactComponent as AppLogo} from "../../public/logo.svg"
import ServerListItem, {type ServerListItemProps} from "./ServerListItem"

export type NavigationProps = {
  servers: ServerListItemProps[]
}

const Navigation: FC<NavigationProps> = ({servers}) => {
  return (
    <div className="h-full overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col items-center justify-center">
        <AppLogo
          className="cursor-pointer"
          onClick={() => {
            /* TODO:  Handle click on logo. */
          }}
        />

        <div className="flex items-end font-iowan">
          <div>Mirage</div>

          <span className="ml-[2px] text-xs italic">©</span>
        </div>

        <div className="m-4 h-[1px] w-full bg-neutral-300" />

        <div className="flex flex-col items-end justify-center gap-4">
          {servers.map((server, index) => (
            <ServerListItem key={index} {...server} />
          ))}

          <Tippy
            content="Add server"
            arrow
            inertia
            animation="scale-subtle"
            duration={100}
            placement="right">
            <div
              className="cursor-pointer"
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
