import Tippy from "@tippyjs/react"
import Avatar from "boring-avatars"
import {type FC} from "react"
import "../styles/ServerListItem.sass"

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
  const selectedClass = isActive ? "selected" : ""

  const avatarImage =
    avatarUrl !== undefined ? (
      <img src={avatarUrl} />
    ) : (
      <Avatar variant="bauhaus" name="Margaret Sanger" />
    )

  return (
    <div className="ServerListItem">
      <div className="indicator-container">
        <div className={"indicator " + selectedClass} />
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
          className={"avatar " + selectedClass}
          onClick={onClick}>
          {avatarImage}
        </div>
      </Tippy>
    </div>
  )
}

export default ServerListItem
