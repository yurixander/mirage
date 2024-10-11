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
      <AccordionPrimitive.Header aria-hidden className="flex items-center">
        <AccordionPrimitive.Trigger
          aria-hidden
          className="flex flex-1 items-center gap-0.5 p-1 transition-transform focus-visible:ring [&[data-state=open]>svg]:rotate-180">
          <IoMdArrowDropdown
            aria-hidden
            className="size-5 shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400"
          />

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
          "flex size-full gap-1 p-1 transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:ring-0 data-[state=on]:bg-purple-600 dark:hover:bg-neutral-900 dark:focus-visible:bg-neutral-900 dark:data-[state=on]:bg-purple-500 [&[data-state=on]>span]:text-white",
          className
        )}
        size="sm"
        value={roomId}>
        <Text aria-hidden className="size-4 shrink-0" align="center" size="1">
          {emoji}
        </Text>

        <Text
          aria-hidden
          className="text-neutral-600 dark:text-neutral-300"
          size="1"
          weight="semibold">
          {roomName}
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
        className="w-48 dark:bg-neutral-900"
        onCloseAutoFocus={e => {
          e.preventDefault()
        }}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type RoomSections = {
  directs: PartialRoom[]
  groups: PartialRoom[]
  recommended: PartialRoom[]
}

type RoomSectionsGenericActions = {
  onCreateDM: () => void
  onCreateRoom: () => void
  addRoomToSpace: () => void
  // TODO: Handle search types in the future
  onSearch: (searchType: string) => void
}

interface RoomSectionsHandlerProps extends RoomSectionsGenericActions {
  sections: RoomSections
  className?: string
  isDashboardActive: boolean
}

export const RoomSectionsHandler: FC<RoomSectionsHandlerProps> = ({
  sections,
  onCreateDM,
  onCreateRoom,
  onSearch,
  addRoomToSpace,
  isDashboardActive,
  className,
}) => {
  const {directs, groups, recommended} = sections
  const {t} = useTranslation()

  return (
    <AccordionPrimitive.Root className={cn("p-1", className)} type="multiple">
      <ToggleGroup
        aria-hidden
        className="flex flex-col items-start gap-4"
        type="single">
        {directs.length > 0 && (
          <AccordionRoomSection
            title={t(LangKey.DirectChats)}
            actions={
              <MoreActionsDropdown>
                <DropdownMenuItem
                  aria-label={t(LangKey.CreateDM)}
                  onSelect={onCreateDM}>
                  <DropdownMenuLabel>{t(LangKey.CreateDM)}</DropdownMenuLabel>

                  <DropdownMenuShortcut char="D" ctrl shift />
                </DropdownMenuItem>
              </MoreActionsDropdown>
            }>
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

                <DropdownMenuItem
                  aria-label={t(LangKey.SearchRooms)}
                  onSelect={() => {
                    // TODO: Temporally, use correct type in the future implementation of search.
                    onSearch("room")
                  }}>
                  <DropdownMenuLabel>
                    {t(LangKey.SearchRooms)}
                  </DropdownMenuLabel>

                  <DropdownMenuShortcut char="R" shift />
                </DropdownMenuItem>

                <DropdownMenuItem
                  aria-label={t(LangKey.SearchSpaces)}
                  onSelect={() => {
                    // TODO: Temporally, use correct type in the future implementation of search.
                    onSearch("space")
                  }}>
                  <DropdownMenuLabel>
                    {t(LangKey.SearchSpaces)}
                  </DropdownMenuLabel>

                  <DropdownMenuShortcut char="S" shift />
                </DropdownMenuItem>

                {!isDashboardActive && (
                  <DropdownMenuItem
                    aria-label={t(LangKey.AddToSpace)}
                    onSelect={addRoomToSpace}>
                    <DropdownMenuLabel>
                      {t(LangKey.AddToSpace)}
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                )}
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
