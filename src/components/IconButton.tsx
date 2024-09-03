import {type CSSProperties, type FC} from "react"
import {twMerge} from "tailwind-merge"
import NotificationDot from "./NotificationDot"
import {type IconType} from "react-icons"
import React from "react"
import {motion} from "framer-motion"
import useTooltip from "@/hooks/util/useTooltip"

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
  const {renderRef, showTooltip} = useTooltip<HTMLButtonElement>()

  return (
    <motion.button
      ref={renderRef}
      whileTap={{scale: 0.85}}
      onClick={event => {
        try {
          onClick(event)
        } catch (error) {
          if (!(error instanceof Error)) {
            return
          }

          showTooltip(error.message, true)
        }
      }}
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
