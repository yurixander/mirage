import {type FC} from "react"
import React from "react"
import {twMerge} from "tailwind-merge"

export type NotificationDotProps = {
  children: React.JSX.Element
  isVisible: boolean
}

const NotificationDot: FC<NotificationDotProps> = ({children, isVisible}) => {
  return (
    <div className={twMerge("relative inline")}>
      <div>{children}</div>

      {isVisible && (
        <div className="absolute right-0 top-0 size-2.5 rounded-lg border border-neutral-50 bg-red-400" />
      )}
    </div>
  )
}

export default NotificationDot
