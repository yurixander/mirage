import "../styles/ServerListItem.sass"
import Avatar from "boring-avatars"
import Tippy from "@tippyjs/react"
import {type FC} from "react"

export type ServerListItemProps = {
  avatarUrl?: string
  isActive: boolean
  onClick: () => void
  tooltip: string
}

const ServerListItem: FC<ServerListItemProps> = ({
  avatarUrl,
  isActive,
  onClick,
  tooltip,
}) => {
  const selectedClassName = isActive ? "selected" : ""

  const avatarImage =
    avatarUrl !== undefined ? (
      <img src={avatarUrl} />
    ) : (
      <Avatar variant="bauhaus" name="Margaret Sanger" />
    )

  return (
    <div className="ServerListItem">
      <div className="indicator-container">
        <div className={"indicator " + selectedClassName} />
      </div>
      <Tippy
        content={tooltip}
        arrow={true}
        inertia={true}
        animation="scale-subtle"
        duration={100}
        placement={"right"}>
        <div
          tabIndex={!isActive ? 0 : undefined}
          className={"avatar " + selectedClassName}
          onClick={onClick}>
          {avatarImage}
        </div>
      </Tippy>
    </div>
  )
}

export default ServerListItem
