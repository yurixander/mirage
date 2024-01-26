import {type Placement} from "tippy.js"
import "../styles/IconButton.sass"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale-subtle.css"
import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {type FC, memo} from "react"
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

const IconButton: FC<IconButtonProps> = ({
  icon,
  tooltip,
  tooltipPlacement,
  onClick,
  color,
  isDisabled,
  isDotShowed,
}) => {
  const isDisabledClassName = isDisabled ? "disabled" : ""

  return (
    <Tippy
      content={<span className="tooltip-text">{tooltip}</span>}
      arrow={true}
      inertia={true}
      animation="scale-subtle"
      duration={100}
      placement={tooltipPlacement}>
      <div
        className={`IconButton ${isDisabledClassName}`}
        onClick={isDisabled ? undefined : onClick}
        tabIndex={isDisabled ? undefined : 0}>
        <NotificationDot
          isShowed={isDotShowed ?? false}
          children={
            <FontAwesomeIcon
              style={{color: color}}
              className="icon"
              icon={icon}
            />
          }
        />
      </div>
    </Tippy>
  )
}

export default memo(IconButton)
