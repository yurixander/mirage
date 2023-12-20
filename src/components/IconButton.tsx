import {type Placement} from "tippy.js"
import "../styles/IconButton.sass"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale-subtle.css"
import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {memo} from "react"
import NotificationDot from "./NotificationDot"

export type IconButtonProps = {
  onClick: () => void
  tooltip: string
  tooltipPlacement: Placement
  icon: IconProp
  color?: string
  isDisabled?: boolean
  isDotShowed?: boolean
}

function IconButton(props: IconButtonProps) {
  const isDisabledClassName = props.isDisabled ? "disabled" : ""

  return (
    <Tippy
      content={<span className="tooltip-text">{props.tooltip}</span>}
      arrow={true}
      inertia={true}
      animation="scale-subtle"
      duration={100}
      placement={props.tooltipPlacement}>
      <div
        className={`IconButton ${isDisabledClassName}`}
        onClick={props.isDisabled ? undefined : props.onClick}
        tabIndex={props.isDisabled ? undefined : 0}>
        <NotificationDot
          isShowed={props.isDotShowed ? props.isDotShowed : false}
          children={
            <FontAwesomeIcon
              style={{color: props.color}}
              className="icon"
              icon={props.icon}
            />
          }
        />
      </div>
    </Tippy>
  )
}

export default memo(IconButton)
