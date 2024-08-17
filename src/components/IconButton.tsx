import {type CSSProperties, type FC} from "react"
import {twMerge} from "tailwind-merge"
import NotificationDot from "./NotificationDot"
import {type IconType} from "react-icons"
import React from "react"
import {motion} from "framer-motion"

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
  onMouseEnter?: () => void
}

const IconButton: FC<IconButtonProps> = ({
  Icon,
  onClick,
  onMouseEnter,
  color,
  isDisabled,
  isDotVisible,
  tooltip,
  size,
  className,
  iconClassName,
}) => {
  return (
    <motion.button
      whileTap={{scale: 0.85}}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      tabIndex={0}
      disabled={isDisabled}
      className={twMerge(
        "inline-block size-max rounded-lg p-1 hover:bg-gray-50 focus-visible:duration-150",
        className
      )}>
      <NotificationDot isVisible={isDotVisible ?? false}>
        <Icon
          style={{color}}
          size={size ?? 20}
          className={twMerge("text-neutral-300", iconClassName)}
        />
      </NotificationDot>
    </motion.button>
  )
}

export default IconButton
