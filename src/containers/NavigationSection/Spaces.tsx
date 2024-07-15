import {type FC} from "react"
import Space from "./Space"
import {type PartialSpace} from "./hooks/useSpaces"
import {StaticAssetPath} from "@/utils/util"
import LoadingEffect from "@/components/LoadingEffect"

type SpacesNavProps = {
  spaces: PartialSpace[]
  isLoading: boolean
  spaceSelected?: string
  onCreateSpace: () => void
  onSpaceSelected: (spaceId?: string) => void
}

const Spaces: FC<SpacesNavProps> = ({
  spaces,
  isLoading,
  onCreateSpace,
  onSpaceSelected,
  spaceSelected,
}) => {
  return (
    <div className="flex flex-col gap-3 overflow-hidden overflow-y-scroll scrollbar-hide">
      <Space
        isSelected={spaceSelected === undefined}
        spaceId="home"
        // TODO: This avatar url is temporarily.
        avatarUrl={StaticAssetPath.SpaceHome}
        onSpaceSelected={() => {
          // Change space selected to undefined.
          onSpaceSelected()
        }}
      />

      {isLoading ? (
        <SpacesPlaceHolder length={2} />
      ) : (
        spaces.map(space => (
          <Space
            key={space.spaceId}
            spaceId={space.spaceId}
            isSelected={space.spaceId === spaceSelected}
            onSpaceSelected={onSpaceSelected}
            avatarUrl={space.avatarUrl}
          />
        ))
      )}

      <div
        onClick={onCreateSpace}
        className="-ml-0.5 flex w-full justify-center"
        aria-hidden>
        <div className="relative box-border flex size-10 max-w-10 cursor-pointer items-center justify-center rounded-lg border-[3px] border-zinc-200">
          <div className="absolute h-0.5 w-4 rounded-full bg-zinc-200" />

          <div className="absolute h-4 w-0.5 rounded-full bg-zinc-200" />
        </div>
      </div>
    </div>
  )
}

const SpacesPlaceHolder: FC<{length?: number}> = ({length = 1}) => {
  return Array.from({length}).map((_, index) => (
    <div className="flex items-center gap-1">
      <div className="-ml-0.5 h-0.5 w-1.5 bg-transparent" />

      <div
        key={index}
        className="size-10 overflow-hidden rounded-md bg-neutral-300">
        <LoadingEffect />
      </div>
    </div>
  ))
}

export default Spaces
