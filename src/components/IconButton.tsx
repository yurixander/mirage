import {type Placement} from "tippy.js"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale-subtle.css"
import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {type FC, memo} from "react"
import NotificationDot from "./NotificationDot"
import {twMerge} from "tailwind-merge"

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
  const iconButtonTwClassName = twMerge(
    "inline-block self-center cursor-pointer p-5px rounded-10",
    "focus-visible:transition focus-visible:duration-150 focus-visible:outline-2 focus-visible:outline-outlineTab",
    "focus-visible:rounded-5",
    "hover:bg-contrast",
    isDisabled
      ? "active:animate-none active:transform-none cursor-not-allowed"
      : "active:animate-hold active:scale-90"
  )

  return (
    <Tippy
      content={<span className="text-normal font-default">{tooltip}</span>}
      arrow={true}
      inertia={true}
      animation="scale-subtle"
      duration={100}
      placement={tooltipPlacement}>
      <div
        className={iconButtonTwClassName}
        onClick={isDisabled ? undefined : onClick}
        tabIndex={isDisabled ? undefined : 0}>
        <NotificationDot
          isShowed={isDotShowed ?? false}
          children={
            <FontAwesomeIcon
              style={{color}}
              className="text-contrastIcon"
              icon={icon}
            />
          }
        />
      </div>
    </Tippy>
  )
}

export default memo(IconButton)
