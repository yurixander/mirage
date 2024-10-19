import type {FC} from "react"
import {twMerge} from "tailwind-merge"
import LoadingEffect from "../../components/LoadingEffect"

const MessagesPlaceholder: FC = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full gap-1">
        <SkeletonAvatar />

        <div className="inline-flex w-full flex-col gap-1">
          <SkeletonLine className="h-4 w-40" />

          <div className="flex w-full flex-row gap-1.5">
            <SkeletonLine />

            <div className="h-3 w-full" />

            <SkeletonLine className="h-3 w-full max-w-10" />
          </div>

          <SkeletonLine className="h-3 w-52" />
        </div>
      </div>

      <div className="flex w-full gap-1">
        <SkeletonAvatar />

        <div className="inline-flex w-full flex-col gap-1">
          <SkeletonLine className="h-4 w-60" />

          <div className="flex w-full flex-row gap-1.5">
            <SkeletonLine className="h-3 w-10" />

            <SkeletonLine className="h-3 w-20" />

            <SkeletonLine className="h-3 w-10" />

            <SkeletonLine className="h-3 w-20" />

            <div className="h-3 w-full" />

            <SkeletonLine className="h-3 w-full max-w-10" />
          </div>

          <div className="flex flex-row gap-1.5">
            <SkeletonLine className="h-3 w-5" />

            <SkeletonLine className="h-3 w-20" />

            <SkeletonLine className="h-3 w-10" />

            <SkeletonLine className="h-3 w-16" />
          </div>
        </div>
      </div>

      <div className="flex w-full gap-1">
        <SkeletonAvatar />

        <div className="inline-flex w-full flex-col gap-1">
          <SkeletonLine className="h-4 w-36" />

          <div className="flex w-full flex-row gap-1">
            <SkeletonLine className="h-52 w-full max-w-44" />

            <SkeletonLine className="h-52 w-full max-w-44" />

            <div className="h-3 w-full" />

            <SkeletonLine className="h-3 w-full max-w-10" />
          </div>
        </div>
      </div>

      <div className="flex w-full gap-1">
        <SkeletonAvatar />

        <div className="inline-flex w-full flex-col gap-1">
          <SkeletonLine className="h-4 w-40" />

          <div className="flex w-full flex-row gap-1.5">
            <SkeletonLine className="h-3 w-10" />

            <SkeletonLine className="h-3 w-10" />

            <SkeletonLine className="h-3 w-20" />

            <SkeletonLine className="h-3 w-5" />

            <SkeletonLine className="h-3 w-10" />

            <div className="h-3 w-full" />

            <SkeletonLine className="h-3 w-full max-w-10" />
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

      <div className="flex w-full gap-1">
        <SkeletonAvatar />

        <div className="inline-flex w-full flex-col gap-1">
          <SkeletonLine className="h-4 w-36" />

          <div className="flex w-full flex-row gap-1">
            <SkeletonLine className="h-52 w-full max-w-44" />

            <SkeletonLine className="h-52 w-full max-w-44" />

            <div className="h-3 w-full" />

            <SkeletonLine className="h-3 w-full max-w-10" />
          </div>

          <div className="flex flex-row gap-1">
            <SkeletonLine className="h-52 w-44" />

            <SkeletonLine className="h-52 w-44" />
          </div>
        </div>
      </div>
    </div>
  )
}

type SkeletonProps = {
  className?: string
}

const SkeletonLine: FC<SkeletonProps> = ({className}) => {
  return (
    <div
      className={twMerge(
        "animate-hold overflow-hidden rounded bg-slate-300",
        className ?? "h-3 w-80"
      )}>
      <LoadingEffect />
    </div>
  )
}

const SkeletonAvatar: FC<SkeletonProps> = ({className = "size-10"}) => {
  return (
    <div className="relative">
      <div
        className={twMerge(
          "relative overflow-hidden rounded-lg bg-slate-300",
          className
        )}>
        <LoadingEffect />
      </div>
    </div>
  )
}

export default MessagesPlaceholder
