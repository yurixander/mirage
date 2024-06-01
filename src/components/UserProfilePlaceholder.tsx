import {type FC} from "react"
import LoadingEffect from "./LoadingEffect"

const UserProfilePlaceholder: FC = () => {
  return (
    <div>
      <div className="flex gap-1">
        <div className="size-10 overflow-hidden rounded-lg bg-neutral-300">
          <LoadingEffect />
        </div>
        <div className="flex-col gap-1">
          <div className=" overflow-hidden rounded-lg bg-neutral-300 text-base leading-[100%] text-transparent">
            Emerald branch
            <LoadingEffect />
          </div>

          <div className="mt-1 h-3 w-min overflow-hidden rounded-lg bg-neutral-300 text-xs text-transparent">
            @emerald
            <LoadingEffect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePlaceholder
