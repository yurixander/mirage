import {type FC} from "react"
import LoadingEffect from "./LoadingEffect"

const UserProfilePlaceholder: FC = () => {
  return (
    <div>
      <div className="flex gap-1">
        <div className="relative">
          <div className="relative size-[40px] overflow-hidden rounded-[10px] bg-neutral-300">
            <LoadingEffect />
          </div>

          <div
            className={
              "absolute bottom-0 right-0 size-[13px] translate-x-1/4 translate-y-1/4 rounded-[50%] border-[2px] border-solid border-neutral-50 bg-neutral-300"
            }
          />
        </div>
        <div className="mr-auto inline-flex flex-col gap-[2px]">
          <div className="overflow-hidden rounded-[10px] bg-neutral-300 text-base font-semibold leading-[100%] text-profileGhost">
            Emerald branch
            <LoadingEffect />
          </div>

          <div className="mt-1 h-3 w-min overflow-hidden rounded-[10px] bg-neutral-300 text-xs text-profileGhost">
            @emerald
            <LoadingEffect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePlaceholder
