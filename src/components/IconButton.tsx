import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import NotificationDot from "./NotificationDot"
import {type IconType} from "react-icons"

export type IconButtonProps = {
  onClick: () => void
  tooltip: string
  Icon: IconType
  size?: number
  color?: string
  isDisabled?: boolean
  isDotVisible?: boolean
  className?: string
  iconClassName?: string
}

const IconButton: FC<IconButtonProps> = ({
  Icon,
  onClick,
  color,
  isDisabled,
  isDotVisible,
  size,
  className,
  iconClassName,
}) => {
  const isDisabledClass = isDisabled
    ? "active:animate-none active:transform-none cursor-not-allowed opacity-50 hover:bg-none"
    : "active:animate-hold active:scale-90 hover:bg-neutral-50"

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      tabIndex={isDisabled ? undefined : 0}
      className={twMerge(
        "inline-block size-max rounded-lg p-1 focus-visible:duration-150",
        isDisabledClass,
        className
      )}>
      <NotificationDot isVisible={isDotVisible ?? false}>
        <Icon
          style={{color}}
          size={size ?? 20}
          className={twMerge("text-neutral-300", iconClassName)}
        />
      </NotificationDot>
    </button>
  )
}

export default memo(IconButton)
