import {type FC} from "react"
import Space, {type SpaceProps} from "./Space"

type SpacesNavProps = {
  spaces: SpaceProps[]
  spaceSelected?: string
  onSpaceSelected: (spaceId?: string) => void
}

const SpacesNav: FC<SpacesNavProps> = ({
  spaces,
  onSpaceSelected,
  spaceSelected,
}) => {
  return (
    <div className="flex w-max flex-col gap-3 overflow-hidden overflow-y-scroll scrollbar-hide">
      <Space
        isSelected={spaceSelected === undefined}
        spaceId="home"
        // TODO: This avatar url is temporarily.
        avatarUrl="public\space-home.png"
        onSpaceSelected={() => {
          onSpaceSelected()
        }}
      />

      {spaces.map(space => (
        <Space key={space.spaceId} {...space} />
      ))}

      <div
        className="flex w-full justify-end"
        aria-hidden
        onClick={() => {
          // TODO: Handle here onClick for create space.
        }}>
        <div className="relative box-border flex size-10 max-h-10 max-w-10 cursor-pointer items-center justify-center rounded-lg border-4 border-zinc-200">
          <div className="absolute h-1 w-5 rounded-full bg-zinc-200" />

          <div className="absolute h-5 w-1 rounded-full bg-zinc-200" />
        </div>
      </div>
    </div>
  )
}

export default SpacesNav
