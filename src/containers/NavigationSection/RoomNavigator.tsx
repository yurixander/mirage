import * as React from "react"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"

import {cn} from "@/utils/utils"
import {useCallback, useMemo, useState, type FC} from "react"
import {Text} from "@/components/ui/typography"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {motion} from "framer-motion"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {IoMedical} from "react-icons/io5"
import {WIDTH_FILL_NAVIGATOR_ANIM} from "@/utils/animations"
import {trim} from "@/utils/util"
import {SearchInput} from "@/components/ui/input"
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
        "group hover:bg-transparent data-[state=on]:bg-transparent",
        className
      )}>
      <Text
        size="4"
        className="flex w-auto grow items-center gap-2 truncate text-foreground/70 group-data-[state=on]:text-purple-500"
        weight="medium">
        <Icon className="text-neutral-400/80 group-data-[state=on]:text-purple-500" />

        {trim(roomName, 20)}
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

const MAX_ROOM_LENGTH_FOR_SEARCH = 20

export const RoomNavigator: FC<RoomNavigatorProps> = ({
  sections,
  isLoading,
  className,
  onRoomSelected,
  roomSelected,
  onRecommendedRoomClick,
}) => {
  const {t} = useTranslation()
  const [searchResult, setSearchResult] = useState<RoomSections | null>(null)

  const allRoomsLength =
    sections.groups.length +
    sections.directs.length +
    sections.recommended.length

  const {directs, groups, recommended} = useMemo(
    () => (searchResult === null ? sections : searchResult),
    [searchResult, sections]
  )

  const searchRoom = useCallback(
    (query: string) => {
      setSearchResult({
        directs: directs.filter(({roomName}) =>
          roomName.toLowerCase().includes(query)
        ),
        groups: groups.filter(({roomName}) =>
          roomName.toLowerCase().includes(query)
        ),
        recommended: recommended.filter(({roomName}) =>
          roomName.toLowerCase().includes(query)
        ),
      })
    },
    [directs, groups, recommended]
  )

  if (isLoading) {
    return (
      <div className={cn("flex w-full flex-col gap-y-2", className)}>
        <RoomSectionSkeleton />

        <RoomSectionSkeleton roomsLength={2} />
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-y-1 p-2", className)}>
      {allRoomsLength > MAX_ROOM_LENGTH_FOR_SEARCH && (
        <div className="p-2">
          <SearchInput
            onQueryDebounceChange={debouncedQuery => {
              if (debouncedQuery.length === 0) {
                setSearchResult(null)

                return
              }

              searchRoom(debouncedQuery.toLowerCase())
            }}
          />
        </div>
      )}

      <ToggleGroup
        className="flex flex-col items-start gap-y-4"
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
        <RoomSection className="pt-3" title={t(LangKey.Recommended)}>
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
      <Text className="uppercase text-neutral-400/80" weight="medium" size="2">
        {title}
      </Text>

      {children}
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
