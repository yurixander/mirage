import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type NotificationDotProps = {
  children: JSX.Element
  isVisible: boolean
}

const NotificationDot: FC<NotificationDotProps> = ({children, isVisible}) => {
  return (
    <div className="relative inline">
      <div>{children}</div>

      {isVisible && (
        <div
          className={twMerge(
            "absolute top-0 right-0 h-dotSize w-dotSize",
            "bg-red-500 rounded-10 border-1 border-solid border-neutral-50"
          )}
        />
      )}
    </div>
  )
}

export default NotificationDot
