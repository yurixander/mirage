import * as React from "react"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"

import {cn} from "@/utils/utils"
import {type FC} from "react"
import {Text} from "@/components/ui/typography"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {motion} from "framer-motion"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {IoMedical} from "react-icons/io5"
import {WIDTH_FILL_NAVIGATOR_ANIM} from "@/utils/animations"
import {trim} from "@/utils/util"
import LoadingEffect from "@/components/LoadingEffect"
import {RoomType} from "./hooks/useRoomNavigator"
import {LiaSlackHash} from "react-icons/lia"
import {twMerge} from "tailwind-merge"

interface SelectableRoomProps extends PartialRoom {
  className?: string
}

const SelectableRoom: FC<SelectableRoomProps> = ({
  roomId,
  roomName,
  type,
  className,
}) => {
  const Icon = type === RoomType.Direct ? IoMedical : LiaSlackHash

  return (
    <ToggleGroupItem
      aria-label={roomName}
      value={roomId}
      size="sm"
      className={cn(
        "group size-max max-w-64 truncate px-2 py-1 hover:bg-transparent data-[state=on]:bg-transparent",
        className
      )}>
      <Text
        className="flex items-center gap-x-1 text-foreground/70 group-data-[state=on]:text-purple-500"
        weight="medium"
        align="left">
        <Icon className="shrink-0 text-neutral-400/80 group-data-[state=on]:text-purple-500" />

        {trim(roomName, 24)}
      </Text>
    </ToggleGroupItem>
  )
}

export const EMPTY_SECTIONS: RoomSections = {
  directs: [],
  groups: [],
  recommended: [],
}

export type RoomSections = {
  directs: PartialRoom[]
  groups: PartialRoom[]
  recommended: PartialRoom[]
}

type RoomNavigatorActions = {
  onCreateRoom: () => void
}

export interface RoomNavigatorProps extends RoomNavigatorActions {
  sections: RoomSections
  roomSelected?: string
  onRoomSelected: (roomId: string) => void
  onRecommendedRoomClick: (roomId: string) => void
  isDashboardActive: boolean
  isLoading: boolean
  className?: string
}

export const RoomNavigator: FC<RoomNavigatorProps> = ({
  sections,
  isLoading,
  className,
  onRoomSelected,
  roomSelected,
  onRecommendedRoomClick,
}) => {
  const {t} = useTranslation()
  const {directs, groups, recommended} = sections

  if (isLoading) {
    return (
      <div className={cn("flex w-full flex-col gap-y-2", className)}>
        <RoomSectionSkeleton />

        <RoomSectionSkeleton roomsLength={2} />
      </div>
    )
  }

  return (
    <div className={cn("mx-3 my-3 flex flex-col gap-y-3", className)}>
      <ToggleGroup
        className="flex flex-col items-start gap-y-4 overflow-x-hidden"
        type="single"
        value={roomSelected ?? ""}
        onValueChange={value => {
          if (value.length === 0) {
            return
          }

          onRoomSelected(value)
        }}>
        {directs.length > 0 && (
          <RoomSection title={t(LangKey.Contacts)}>
            {directs.map(room => (
              <SelectableRoom key={room.roomId} {...room} />
            ))}
          </RoomSection>
        )}

        {groups.length > 0 && (
          <RoomSection title={t(LangKey.Rooms)}>
            {groups.map(room => (
              <SelectableRoom key={room.roomId} {...room} />
            ))}
          </RoomSection>
        )}
      </ToggleGroup>

      {recommended.length > 0 && (
        <RoomSection title={t(LangKey.Recommended)}>
          {recommended.map(({roomName, roomId}) => (
            <motion.button
              key={roomId}
              aria-label={roomName}
              onClick={() => onRecommendedRoomClick(roomId)}
              className={className}>
              <Text
                className="flex w-auto grow items-center gap-x-2 truncate px-2 text-foreground/70"
                size="4"
                weight="medium">
                <LiaSlackHash className="text-neutral-400/80" />

                {trim(roomName, 20)}
              </Text>
            </motion.button>
          ))}
        </RoomSection>
      )}
    </div>
  )
}

type RoomSectionProps = {
  title: string
  children: React.ReactNode
  className?: string
}

const RoomSection: FC<RoomSectionProps> = ({children, title, className}) => {
  return (
    <div className={twMerge("flex flex-col gap-y-1", className)}>
      <Text className="uppercase text-neutral-400/80" weight="medium" size="1">
        {title}
      </Text>

      <div className="flex flex-col gap-y-1">{children}</div>
    </div>
  )
}

type RoomSectionSkeletonProps = {
  roomsLength?: number
  className?: string
}

const RoomSectionSkeleton: FC<RoomSectionSkeletonProps> = ({
  roomsLength = 1,
  className,
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-2 p-3", className)}>
      <div className="flex w-full items-center justify-between gap-2">
        <motion.div
          variants={WIDTH_FILL_NAVIGATOR_ANIM}
          initial="initial"
          whileInView="whileInView"
          className="h-5 max-w-24 overflow-hidden rounded-sm bg-neutral-400/50 dark:bg-neutral-700">
          <LoadingEffect />
        </motion.div>

        <motion.div
          initial={{scale: 0.5, opacity: 0}}
          whileInView={{scale: 1, opacity: 1}}
          className="size-5 rounded-sm bg-neutral-400/50 dark:bg-neutral-700"
        />
      </div>

      {Array.from({length: roomsLength}).map((_, index) => (
        <motion.div
          key={index}
          variants={WIDTH_FILL_NAVIGATOR_ANIM}
          initial="initial"
          whileInView="whileInView"
          className="h-4 w-full overflow-hidden rounded-sm bg-neutral-400/50 dark:bg-neutral-700">
          <LoadingEffect />
        </motion.div>
      ))}
    </div>
  )
}
