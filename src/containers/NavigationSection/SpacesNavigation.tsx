import {type FC} from "react"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import {motion} from "framer-motion"
import Avatar from "boring-avatars"
import {twMerge} from "tailwind-merge"
import {SCALE_IN_ANIM, SPACE_INDICATOR_ANIM} from "@/utils/animations"
import {type SpaceProps} from "./Space"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {type PartialSpace} from "./hooks/useSpaces"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {StaticAssetPath} from "@/utils/util"
import {ScrollArea} from "@/components/ui/scroll-area"
import {ReactSVG} from "react-svg"
import LoadingEffect from "@/components/LoadingEffect"
import MatrixImage from "@/components/MatrixImage"

export const DASHBOARD_SPACE_ID = "dashboard_space_id"

export type SpaceNavigationProps = {
  spaces: PartialSpace[]
  selectedSpace?: string
  onSelectedSpaceChange: (spaceId: string) => void
  onCreateSpace: () => void
}

const SpacesNavigation: FC<SpaceNavigationProps> = ({
  spaces,
  selectedSpace,
  onSelectedSpaceChange,
  onCreateSpace,
}) => {
  const {t} = useTranslation()

  return (
    <ScrollArea
      className="flex h-full flex-col"
      type="scroll"
      isScrollBarHidden>
      <ToggleGroup
        role="navigation"
        value={selectedSpace}
        className="flex w-max flex-col"
        orientation="vertical"
        type="single"
        onValueChange={value => {
          if (value.length === 0) {
            return
          }

          onSelectedSpaceChange(value)
        }}>
        <SpaceAvatar
          isSelected={selectedSpace === DASHBOARD_SPACE_ID}
          spaceName={t(LangKey.AllSpaces)}
          spaceId={DASHBOARD_SPACE_ID}
          avatarUrl={StaticAssetPath.SpaceHome}
        />

        {spaces.map(({name, spaceId, avatarUrl}) => (
          <SpaceAvatar
            key={spaceId}
            isSelected={selectedSpace === spaceId}
            spaceName={name}
            spaceId={spaceId}
            avatarUrl={avatarUrl}
          />
        ))}

        <CreateSpaceButton onCreateSpace={onCreateSpace} />
      </ToggleGroup>
    </ScrollArea>
  )
}

type SpaceAvatarProps = Omit<SpaceProps, "onSpaceSelected">

const SpaceAvatar: FC<SpaceAvatarProps> = ({
  spaceName,
  spaceId,
  avatarUrl,
  isSelected,
  classNames,
}) => {
  const {t} = useTranslation()

  return (
    <div className="flex items-center">
      <motion.div
        variants={SPACE_INDICATOR_ANIM}
        animate={isSelected ? "selected" : "default"}
        className="-ml-1 mr-1 w-2 rounded-full bg-purple-500"
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger aria-hidden tabIndex={-1} asChild>
            <motion.div
              tabIndex={-1}
              variants={SCALE_IN_ANIM}
              initial="initial"
              whileInView="whileInView"
              whileTap={{scale: 0.9}}
              transition={{
                duration: 0.2,
              }}>
              <ToggleGroupItem
                value={spaceId}
                aria-label={spaceName}
                variant="outline"
                className={twMerge(
                  "size-10 overflow-clip border-2 px-0 shadow-none transition-transform hover:bg-transparent focus-visible:scale-110 focus-visible:ring-0 focus-visible:active:scale-100 data-[state=off]:border-transparent data-[state=on]:border-purple-500",
                  classNames
                )}>
                {avatarUrl === undefined ? (
                  <Avatar
                    name={spaceName}
                    className="dark:opacity-90"
                    aria-hidden
                    size="100%"
                    square
                    variant="bauhaus"
                  />
                ) : (
                  <MatrixImage
                    aria-hidden
                    className="size-full object-cover dark:opacity-90"
                    src={avatarUrl}
                    alt={t(LangKey.AvatarOf, spaceName)}
                  />
                )}
              </ToggleGroupItem>
            </motion.div>
          </TooltipTrigger>

          <TooltipContent aria-hidden side="right">
            {spaceName}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

SpaceAvatar.displayName = "SpaceAvatar"

export const CreateSpaceButton: FC<{
  onCreateSpace: () => void
  className?: string
}> = ({onCreateSpace, className}) => {
  const {t} = useTranslation()

  return (
    <div className={twMerge("flex w-max justify-center gap-0.5", className)}>
      <div className="-ml-0.5 w-2" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              aria-label={t(LangKey.CreateSpace)}
              variants={SCALE_IN_ANIM}
              initial="initial"
              whileInView="whileInView"
              onClick={onCreateSpace}
              className="focus-visible:rounded-sm focus-visible:ring">
              <ReactSVG src={StaticAssetPath.CreateSpace} />
            </motion.button>
          </TooltipTrigger>

          <TooltipContent aria-hidden side="right">
            {t(LangKey.CreateSpace)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export const SpacesPlaceHolder: FC<{length?: number}> = ({length = 1}) => {
  return Array.from({length}, (_, index) => (
    <motion.div
      variants={SCALE_IN_ANIM}
      initial="initial"
      whileInView="whileInView"
      className="flex w-full justify-center gap-0.5 sm:gap-1"
      key={index}>
      <div className="size-8 overflow-hidden rounded-sm bg-neutral-400/50 dark:bg-neutral-700 sm:size-10 sm:rounded-md">
        <LoadingEffect />
      </div>
    </motion.div>
  ))
}

export default SpacesNavigation
