import {cn} from "@/utils/utils"
import {forwardRef, HTMLAttributes} from "react"

const UnreadIndicator = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => {
  const lineClass = "h-px grow bg-red-500"

  return (
    <div
      ref={ref}
      className={cn("flex flex-row items-center justify-center", className)}
      {...props}>
      <div className={lineClass} />

      <span className="mx-3 text-xs uppercase text-red-500">New messages</span>

      <div className={lineClass} />
    </div>
  )
})

export default UnreadIndicator
