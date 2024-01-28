/* eslint-disable tailwindcss/enforces-shorthand */
import LoadingEffect from "./LoadingEffect"

const UserProfilePlaceholder = () => {
  return (
    <div>
      <div className="flex gap-5px">
        <div className="relative">
          <div className="relative h-avatarSize w-avatarSize overflow-hidden rounded-10 bg-contrastDarker">
            <LoadingEffect />
          </div>

          <div
            className={
              "absolute bottom-0 right-0 h-statusSize w-statusSize translate-x-1/4 translate-y-1/4 rounded-50 border-2 border-solid border-contrast bg-contrastDarker"
            }
          />
        </div>
        <div className="mr-auto inline-flex flex-col gap-3px">
          <div className="overflow-hidden rounded-10 bg-contrastDarker text-large font-strong text-profileGhost">
            Emerald branch
            <LoadingEffect />
          </div>

          <div className="mt-3px h-10px w-min overflow-hidden rounded-10 bg-contrastDarker text-xs text-profileGhost">
            @emerald
            <LoadingEffect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePlaceholder
