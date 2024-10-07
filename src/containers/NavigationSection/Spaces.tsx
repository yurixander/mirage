import {type FC} from "react"
import Space from "./Space"
import {type PartialSpace} from "./hooks/useSpaces"
import {StaticAssetPath} from "@/utils/util"
import LoadingEffect from "@/components/LoadingEffect"
import {motion} from "framer-motion"
import {scaleInAnimation} from "@/utils/animations"
import {LangKey} from "@/lang/allKeys"
import {ScrollArea} from "@/components/ui/scroll-area"
import {twMerge} from "tailwind-merge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useTranslation from "@/hooks/util/useTranslation"

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
  const {t} = useTranslation()

  return (
    <ScrollArea
      className={twMerge("flex h-[500px] w-max flex-col", className)}
      type="scroll"
      isScrollBarHidden>
      <nav className="flex flex-col gap-3 pr-1">
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

        <div className="flex w-max justify-center gap-0.5 sm:gap-1">
          <div className="-ml-0.5 w-1 sm:w-1.5" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  aria-label={t(LangKey.CreateSpace)}
                  variants={scaleInAnimation}
                  initial="initial"
                  whileInView="whileInView"
                  className="box-border flex size-[30px] items-center justify-center rounded-sm border-2 border-neutral-200 dark:border-neutral-400 sm:size-10 sm:rounded-md sm:border-[3px]"
                  onClick={onCreateSpace}>
                  <div className="absolute h-0.5 w-4 rounded-full bg-neutral-200 dark:bg-neutral-400" />

                  <div className="absolute h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-400" />
                </motion.button>
              </TooltipTrigger>

              <TooltipContent side="right">
                {t(LangKey.CreateSpace)}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
