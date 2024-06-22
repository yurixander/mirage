import {type CSSProperties, type FC} from "react"
import {twMerge} from "tailwind-merge"
import NotificationDot from "./NotificationDot"
import {type IconType} from "react-icons"
import React from "react"

export type IconButtonProps = {
  tooltip: string
  Icon: IconType
  size?: number
  color?: CSSProperties["color"]
  isDisabled?: boolean
  isDotVisible?: boolean
  className?: string
  iconClassName?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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

export default IconButton
