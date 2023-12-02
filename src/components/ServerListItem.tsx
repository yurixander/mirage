import "../styles/ServerListItem.sass"
import Avatar from "boring-avatars"
import Tippy from "@tippyjs/react"

export type ServerListItemProps = {
  avatarUrl?: string,
  isActive: boolean,
  onClick: () => void
  tooltip: string
}

export default function ServerListItem(props: ServerListItemProps) {
  const selectedClassName = props.isActive ? "selected" : ""

  const avatarImage = props.avatarUrl !== undefined
    ? <img src={props.avatarUrl} />
    : <Avatar variant="bauhaus" name="Margaret Sanger" />

  return (
    <div className="ServerListItem">
      <div className="indicator-container">
        <div className={"indicator " + selectedClassName} />
      </div>
      <Tippy
        content={props.tooltip}
        arrow={true}
        inertia={true}
        animation="scale-subtle"
        duration={100}
        placement={"right"}>
        <div
          className={"avatar " + selectedClassName}
          onClick={props.onClick} >
          {avatarImage}
        </div>
      </Tippy>
    </div>
  )
}
