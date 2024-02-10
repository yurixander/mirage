import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import NotificationDot from "./NotificationDot"

export type IconButtonProps = {
  onClick: () => void
  tooltip: string
  icon: IconProp
  color?: string
  isDisabled?: boolean
  isDotVisible?: boolean
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  color,
  isDisabled,
  isDotVisible,
}) => {
  const isDisabledClass = isDisabled
    ? "active:animate-none active:transform-none cursor-not-allowed opacity-50 hover:bg-none"
    : "active:animate-hold active:scale-90 hover:bg-neutral-50"

  return (
    <div
      onClick={isDisabled ? undefined : onClick}
      tabIndex={isDisabled ? undefined : 0}
      className={twMerge(
        "inline-block self-center cursor-pointer p-1 rounded-[10px] focus-visible:duration-150 focus-visible:rounded-[5px]",
        isDisabledClass
      )}>
      <NotificationDot isVisible={isDotVisible ?? false}>
        <FontAwesomeIcon
          style={{color}}
          className="text-neutral-300"
          icon={icon}
        />
      </NotificationDot>
    </div>
  )
}

export default memo(IconButton)
