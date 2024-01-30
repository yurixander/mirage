import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Tippy from "@tippyjs/react"
import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import {type Placement} from "tippy.js"
import "tippy.js/animations/scale-subtle.css"
import "tippy.js/dist/tippy.css"
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
  const isDisabledClass = isDisabled
    ? "active:animate-none active:transform-none cursor-not-allowed opacity-50 hover:bg-none"
    : "active:animate-hold active:scale-90 hover:bg-neutral-50"

  return (
    <Tippy
      content={<span className="text-normal font-default">{tooltip}</span>}
      arrow={true}
      inertia={true}
      animation="scale-subtle"
      duration={100}
      placement={tooltipPlacement}>
      <div
        className={twMerge(
          "inline-block self-center cursor-pointer p-5px rounded-10 focus-visible:duration-150 focus-visible:rounded-5",
          isDisabledClass
        )}
        onClick={isDisabled ? undefined : onClick}
        tabIndex={isDisabled ? undefined : 0}>
        <NotificationDot
          isShowed={isDotShowed ?? false}
          children={
            <FontAwesomeIcon
              style={{color}}
              className="text-neutral-300"
              icon={icon}
            />
          }
        />
      </div>
    </Tippy>
  )
}

export default memo(IconButton)
