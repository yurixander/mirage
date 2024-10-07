import {type FC} from "react"
import Space from "./Space"
import {type PartialSpace} from "./hooks/useSpaces"
import {StaticAssetPath} from "@/utils/util"
import LoadingEffect from "@/components/LoadingEffect"
import {motion} from "framer-motion"
import {scaleInAnimation} from "@/utils/animations"
import {t} from "@/utils/lang"
import {LangKey} from "@/lang/allKeys"
import {ScrollArea} from "@/components/ui/scroll-area"
import {twMerge} from "tailwind-merge"

type SpacesNavProps = {
  spaces: PartialSpace[]
  isLoading: boolean
  spaceSelected?: string
  className?: string
  onCreateSpace: () => void
  onSpaceSelected: (spaceId?: string) => void
}

const Spaces: FC<SpacesNavProps> = ({
  spaces,
  isLoading,
  onCreateSpace,
  onSpaceSelected,
  spaceSelected,
  className,
}) => {
  return (
    <ScrollArea
      className={twMerge("flex h-full w-max flex-col", className)}
      type="scroll">
      <nav className="flex flex-col gap-3">
        <Space
          spaceName="All spaces"
          isSelected={spaceSelected === undefined}
          spaceId="home_space_id"
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
              spaceName={space.name}
              key={space.spaceId}
              spaceId={space.spaceId}
              isSelected={space.spaceId === spaceSelected}
              onSpaceSelected={onSpaceSelected}
              avatarUrl={space.avatarUrl}
            />
          ))
        )}

        <div className="flex w-max justify-center gap-1">
          <div className="-ml-0.5 w-1.5" />

          <motion.button
            aria-label={t(LangKey.CreateSpace)}
            variants={scaleInAnimation}
            initial="initial"
            whileInView="whileInView"
            className="box-border flex size-10 items-center justify-center rounded-md border-[3px] border-neutral-200 dark:border-neutral-400"
            onClick={onCreateSpace}>
            <div className="absolute h-0.5 w-4 rounded-full bg-neutral-200 dark:bg-neutral-400" />

            <div className="absolute h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-400" />
          </motion.button>
        </div>

        <div className="h-6 w-1" />
      </nav>
    </ScrollArea>
  )
}

const SpacesPlaceHolder: FC<{length?: number}> = ({length = 1}) => {
  return Array.from({length}, (_, index) => (
    <motion.div
      aria-hidden
      variants={scaleInAnimation}
      initial="initial"
      whileInView="whileInView"
      className="flex w-max items-center gap-1"
      key={index}>
      <div className="-ml-0.5 h-0.5 w-1.5 bg-transparent" />

      <div className="size-10 overflow-hidden rounded-md bg-neutral-300 dark:bg-neutral-700">
        <LoadingEffect />
      </div>
    </motion.div>
  ))
}

export default Spaces
