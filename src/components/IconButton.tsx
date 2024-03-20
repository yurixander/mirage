import {memo, type FC} from "react"
import {twMerge} from "tailwind-merge"
import NotificationDot from "./NotificationDot"
import {type IconType} from "react-icons"

export type IconButtonProps = {
  onClick: () => void
  tooltip: string
  Icon: IconType
  color?: string
  isDisabled?: boolean
  isDotVisible?: boolean
  className?: string
}

const IconButton: FC<IconButtonProps> = ({
  Icon,
  onClick,
  color,
  isDisabled,
  isDotVisible,
  className,
}) => {
  const isDisabledClass = isDisabled
    ? "active:animate-none active:transform-none cursor-not-allowed opacity-50 hover:bg-none"
    : "active:animate-hold active:scale-90 hover:bg-neutral-50"

  return (
    <div
      onClick={isDisabled ? undefined : onClick}
      tabIndex={isDisabled ? undefined : 0}
      className={twMerge(
        "inline-block cursor-pointer self-center rounded-[10px] p-1 focus-visible:rounded-[5px] focus-visible:duration-150",
        isDisabledClass,
        className
      )}
      aria-hidden="true">
      <NotificationDot isVisible={isDotVisible ?? false}>
        <Icon style={{color}} size={20} className="text-neutral-300" />
      </NotificationDot>
    </div>
  )
}

export default memo(IconButton)
