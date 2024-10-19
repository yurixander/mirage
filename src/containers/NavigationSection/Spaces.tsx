import LoadingEffect from "@/components/LoadingEffect"
import {ScrollArea} from "@/components/ui/scroll-area"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {scaleInAnimation} from "@/utils/animations"
import {StaticAssetPath} from "@/utils/util"
import {motion} from "framer-motion"
import type {FC} from "react"
import {twMerge} from "tailwind-merge"
import Space from "./Space"
import type {PartialSpace} from "./hooks/useSpaces"

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
  onSpaceSelected,
  spaceSelected,
  className,
}) => {
  const {t} = useTranslation()

  return (
    <ScrollArea
      className={twMerge("flex h-full w-max flex-col", className)}
      type="scroll"
      isScrollBarHidden>
      <nav className="flex flex-col gap-2 pr-1 sm:gap-3">
        <Space
          spaceName={t(LangKey.AllSpaces)}
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

        {/* <CreateSpaceButton onCreateSpace={onCreateSpace} /> */}

        {/* Blank space to make space for the create space button */}
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
      className="flex w-max items-center gap-0.5 sm:gap-1"
      key={index}>
      <div className="-ml-0.5 w-1 bg-transparent sm:w-1.5" />

      <div className="size-8 overflow-hidden rounded-sm bg-neutral-300 dark:bg-neutral-700 sm:size-10 sm:rounded-md">
        <LoadingEffect />
      </div>
    </motion.div>
  ))
}

export default Spaces
