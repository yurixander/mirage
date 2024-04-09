import {type FC} from "react"
import LoadingEffect from "../../components/LoadingEffect"
import {twMerge} from "tailwind-merge"

const ChatContainerLoader: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1">
        <SkeletonCircle />

        <div className="inline-flex flex-col gap-1">
          <SkeletonLine className="h-4 w-40" />
          <SkeletonLine />
        </div>
      </div>

      <div className="flex gap-1">
        <SkeletonCircle />

        <div className="inline-flex flex-col gap-1">
          <SkeletonLine className="h-4 w-60" />

          <div className="flex flex-row gap-1.5">
            <SkeletonLine className="h-3 w-10" />
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="h-3 w-10" />
            <SkeletonLine className="h-3 w-20" />
          </div>

          <div className="flex flex-row gap-1.5">
            <SkeletonLine className="h-3 w-5" />
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="h-3 w-10" />
            <SkeletonLine className="h-3 w-16" />
          </div>
        </div>
      </div>

      <div className="flex gap-1">
        <SkeletonCircle />

        <div className="inline-flex flex-col gap-1">
          <SkeletonLine className="h-4 w-36" />
          <SkeletonLine className="h-52 w-44" />
        </div>
      </div>

      <div className="flex gap-1">
        <SkeletonCircle />

        <div className="inline-flex flex-col gap-1">
          <SkeletonLine className="h-4 w-40" />

          <div className="flex flex-row gap-1.5">
            <SkeletonLine className="h-3 w-10" />
            <SkeletonLine className="h-3 w-10" />
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="h-3 w-5" />
            <SkeletonLine className="h-3 w-10" />
          </div>

          <div className="flex flex-row gap-1.5">
            <SkeletonLine className="h-3 w-5" />
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="h-3 w-10" />
            <SkeletonLine className="h-3 w-16" />
          </div>

          <div className="flex flex-row gap-1.5">
            <SkeletonLine className="h-3 w-10" />
            <SkeletonLine className="h-3 w-5" />
            <SkeletonLine className="h-3 w-10" />
            <SkeletonLine className="h-3 w-5" />
            <SkeletonLine className="h-3 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatContainerLoader

type SkeletonProps = {
  className?: string
}

const SkeletonLine: FC<SkeletonProps> = ({className}) => {
  return (
    <div
      className={twMerge(
        "overflow-hidden rounded-lg bg-neutral-300",
        className ?? "h-3 w-80"
      )}>
      <LoadingEffect />
    </div>
  )
}

const SkeletonCircle: FC<SkeletonProps> = ({className = "size-10"}) => {
  return (
    <div className="relative">
      <div
        className={twMerge(
          "relative  overflow-hidden rounded-full bg-neutral-300",
          className
        )}>
        <LoadingEffect />
      </div>
    </div>
  )
}
