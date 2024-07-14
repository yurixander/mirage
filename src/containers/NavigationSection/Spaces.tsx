import {type FC} from "react"
import Space from "./Space"
import {type PartialSpace} from "./hooks/useSpaces"
import {StaticAssetPath} from "@/utils/util"

type SpacesNavProps = {
  spaces: PartialSpace[]
  spaceSelected?: string
  onCreateSpace: () => void
  onSpaceSelected: (spaceId?: string) => void
}

const Spaces: FC<SpacesNavProps> = ({
  spaces,
  onCreateSpace,
  onSpaceSelected,
  spaceSelected,
}) => {
  return (
    <div className="flex w-max flex-col gap-3 overflow-hidden overflow-y-scroll scrollbar-hide">
      <Space
        isSelected={spaceSelected === undefined}
        spaceId="home"
        // TODO: This avatar url is temporarily.
        avatarUrl={StaticAssetPath.SpaceHome}
        onSpaceSelected={() => {
          onSpaceSelected()
        }}
      />

      {spaces.map(space => (
        <Space
          key={space.spaceId}
          spaceId={space.spaceId}
          isSelected={space.spaceId === spaceSelected}
          onSpaceSelected={onSpaceSelected}
          avatarUrl={space.avatarUrl}
        />
      ))}

      <div
        className="flex w-full justify-end"
        aria-hidden
        onClick={onCreateSpace}>
        <div className="relative box-border flex size-10 max-w-10 cursor-pointer items-center justify-center rounded-lg border-[3px] border-zinc-200">
          <div className="absolute h-0.5 w-4 rounded-full bg-zinc-200" />

          <div className="absolute h-4 w-0.5 rounded-full bg-zinc-200" />
        </div>
      </div>
    </div>
  )
}

export default Spaces
