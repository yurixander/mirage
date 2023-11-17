import "../styles/ServerListItem.sass"
import {ReactComponent as IndicatorIcon} from "../../public/icons/server-selected-indicator.svg"
import Avatar from "boring-avatars"
import Tippy from "@tippyjs/react"
import {Placement} from "tippy.js"

export type ServerListItemProps = {
  avatarUrl?: string,
  isActive: boolean,
  onClick: () => void
  tooltip: string
  tooltipPlacement: Placement
}

export default function ServerListItem(props: ServerListItemProps) {
  const selectedClassName = props.isActive ? "selected" : ""

  const avatarImage = props.avatarUrl !== undefined
    ? <img src={props.avatarUrl} />
    : <Avatar variant="beam" />

  return (
    <div className="ServerListItem">
      {props.isActive && <IndicatorIcon className={"indicator"} />}
      <Tippy
        content={props.tooltip}
        arrow={true}
        inertia={true}
        animation="scale-subtle"
        duration={100}
        placement={props.tooltipPlacement}>
        <div
          className={"avatar " + selectedClassName}
          onClick={props.onClick} >
          {avatarImage}
        </div>
      </Tippy>
    </div>
  )
}
