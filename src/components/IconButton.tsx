import {Placement} from "tippy.js"
import "../styles/IconButton.sass"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale-subtle.css"
import {IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {memo} from "react"

export type IconButtonProps = {
  onClick: () => void
  tooltip: string
  tooltipPlacement: Placement
  icon: IconProp,
  color?: string
}

function IconButton(props: IconButtonProps) {
  return (
    <Tippy
      content={<span className="tooltip-text">{props.tooltip}</span>}
      arrow={true}
      inertia={true}
      animation="scale-subtle"
      duration={100}
      placement={props.tooltipPlacement}>
      <div
        className="IconButton"
        onClick={props.onClick}
        tabIndex={0}>
        <FontAwesomeIcon style={{color: props.color}} className="icon" icon={props.icon} />
      </div>
    </Tippy>
  )
}

export default memo(IconButton)
