import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import {IoMdArrowDropdown} from "react-icons/io"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"

import {cn} from "@/utils/utils"
import {type FC} from "react"
import {Text} from "@/components/ui/typography"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import {motion} from "framer-motion"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {IoEllipsisHorizontal} from "react-icons/io5"
import {IconButton} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {WIDTH_FILL_NAVIGATOR_ANIM} from "@/utils/animations"
import {trim} from "@/utils/util"

type AccordionRoomSectionProps = {
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export const AccordionRoomSection: FC<AccordionRoomSectionProps> = ({
  title,
  children,
  actions,
}) => {
  return (
    <AccordionPrimitive.Item
      aria-label={title}
      className="w-full"
      value={title}>
      <AccordionPrimitive.Header className="flex items-center">
        <AccordionPrimitive.Trigger className="flex flex-1 items-center gap-0.5 p-1 transition-transform focus-visible:ring [&[data-state=open]>svg]:rotate-180">
          <IoMdArrowDropdown className="size-5 shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400" />

          <Text
            aria-hidden
            size="1"
            className="font-bold uppercase text-neutral-500 dark:text-neutral-400">
            {title}
          </Text>
        </AccordionPrimitive.Trigger>

        {actions !== undefined && (
          <div className="ml-auto max-h-5 max-w-max">{actions}</div>
        )}
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content className="flex w-full flex-col gap-1 overflow-hidden pl-1 data-[state=open]:animate-accordion-down">
        {children}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

interface SelectableRoomProps extends Omit<PartialRoom, "type"> {
  className?: string
}

const SelectableRoom: FC<SelectableRoomProps> = ({
  emoji,
  roomId,
  roomName,
  className,
}) => {
  return (
    <motion.div
      aria-hidden
      initial={{translateX: -25, opacity: 0.5}}
      whileInView={{translateX: 0, opacity: 1}}
      whileTap={{scale: 0.95}}
      transition={{duration: 0.2}}>
      <ToggleGroupItem
        aria-label={roomName}
        className={cn(
          "flex size-full gap-1 p-1 transition-colors hover:bg-neutral-200 focus-visible:bg-neutral-200 focus-visible:ring-0 data-[state=on]:bg-purple-600 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800 dark:data-[state=on]:bg-purple-500 [&[data-state=on]>span]:text-white",
          className
        )}
        size="sm"
        value={roomId}>
        <Text className="size-4 shrink-0" align="center" size="1">
          {emoji}
        </Text>

        <Text
          aria-hidden
          className="text-neutral-600 dark:text-neutral-300"
          size="1"
          weight="semibold">
          {trim(roomName, 26)}
        </Text>
      </ToggleGroupItem>
    </motion.div>
  )
}

type MoreActionsDropdownProps = {
  children: React.ReactNode
}

const MoreActionsDropdown: FC<MoreActionsDropdownProps> = ({children}) => {
  const {t} = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          aria-label={t(LangKey.MoreActions)}
          className="size-5 rounded"
          asBoundary={false}>
          <IoEllipsisHorizontal />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        alignOffset={24}
        className="w-48 "
        onCloseAutoFocus={e => {
          e.preventDefault()
        }}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
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
  isDashboardActive: boolean
  isLoading: boolean
  className?: string
}

export const RoomNavigator: FC<RoomNavigatorProps> = ({
  sections,
  onCreateRoom,
  isLoading,
  className,
  onRoomSelected,
  roomSelected,
}) => {
  const {directs, groups, recommended} = sections
  const {t} = useTranslation()

  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-5 p-2", className)}>
        <RoomSectionSkeleton />

        <RoomSectionSkeleton roomsLength={2} />
      </div>
    )
  }

  return (
    <AccordionPrimitive.Root className={cn("p-1", className)} type="multiple">
      <ToggleGroup
        aria-hidden
        className="flex flex-col items-start gap-4"
        type="single"
        value={roomSelected}
        onValueChange={value => {
          if (value.length === 0) {
            return
          }

          onRoomSelected(value)
        }}>
        {directs.length > 0 && (
          <AccordionRoomSection title={t(LangKey.DirectChats)}>
            {directs.map(room => (
              <SelectableRoom key={room.roomId} {...room} />
            ))}
          </AccordionRoomSection>
        )}

        {groups.length > 0 && (
          <AccordionRoomSection
            title={t(LangKey.Rooms)}
            actions={
              <MoreActionsDropdown>
                <DropdownMenuItem
                  aria-label={t(LangKey.CreateRoom)}
                  onSelect={onCreateRoom}>
                  <DropdownMenuLabel>{t(LangKey.CreateRoom)}</DropdownMenuLabel>

                  <DropdownMenuShortcut char="R" ctrl shift />
                </DropdownMenuItem>
              </MoreActionsDropdown>
            }>
            {groups.map(room => (
              <SelectableRoom key={room.roomId} {...room} />
            ))}
          </AccordionRoomSection>
        )}

        {recommended.length > 0 && (
          <AccordionRoomSection title={t(LangKey.Recommended)}>
            {recommended.map(room => (
              <SelectableRoom key={room.roomId} {...room} />
            ))}
          </AccordionRoomSection>
        )}
      </ToggleGroup>
    </AccordionPrimitive.Root>
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
    <div className={cn("flex animate-pulse flex-col gap-2", className)}>
      <div className="flex w-full items-center justify-between gap-2">
        <motion.div
          variants={WIDTH_FILL_NAVIGATOR_ANIM}
          initial="initial"
          whileInView="whileInView"
          className="h-5 max-w-24 rounded-sm bg-gray-400 dark:bg-neutral-600"
        />

        <motion.div
          initial={{scale: 0.5, opacity: 0}}
          whileInView={{scale: 1, opacity: 1}}
          className="size-5 rounded-sm bg-gray-400 dark:bg-neutral-600"
        />
      </div>

      {Array.from({length: roomsLength}).map((_, index) => (
        <motion.div
          key={index}
          variants={WIDTH_FILL_NAVIGATOR_ANIM}
          initial="initial"
          whileInView="whileInView"
          className="h-4 w-full rounded-sm bg-gray-400 dark:bg-neutral-600"
        />
      ))}
    </div>
  )
}
