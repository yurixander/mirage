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
  return (
    <button
      onClick={onClick}
      tabIndex={0}
      disabled={isDisabled}
      className={twMerge(
        "inline-block size-max rounded-lg p-1 hover:bg-gray-50 focus-visible:duration-150 active:scale-90 active:animate-hold",
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
