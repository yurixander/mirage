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
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"

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
    <AccordionPrimitive.Item className="w-full" value={title}>
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger className="flex flex-1 items-center gap-0.5 p-1 transition-transform focus-visible:ring [&[data-state=open]>svg]:rotate-180">
          <IoMdArrowDropdown className="size-5 shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400" />

          <Text
            size="1"
            className="font-bold uppercase text-neutral-500 dark:text-neutral-400">
            {title}
          </Text>

          {actions !== undefined && (
            <div className="ml-auto max-h-5 max-w-max">{actions}</div>
          )}
        </AccordionPrimitive.Trigger>
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

type RoomSections = {
  directs: PartialRoom[]
  groups: PartialRoom[]
  recommended: PartialRoom[]
}

type RoomSectionsHandlerProps = {
  sections: RoomSections
  className?: string
}

export const RoomSectionsHandler: FC<RoomSectionsHandlerProps> = ({
  sections,
  className,
}) => {
  const {directs, groups, recommended} = sections
  const {t} = useTranslation()

  return (
    <AccordionPrimitive.Root className={cn("p-1", className)} type="multiple">
      <ToggleGroup className="flex flex-col items-start gap-4" type="single">
        {directs.length > 0 && (
          <AccordionRoomSection
            title={t(LangKey.DirectChats)}
            actions={
              <IconButton
                className="size-5 rounded"
                onClick={e => {
                  e.stopPropagation()
                }}>
                <IoEllipsisHorizontal />
              </IconButton>
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
              <Popover>
                <PopoverTrigger asChild>
                  <IconButton
                    className="size-5 rounded"
                    asBoundary={false}
                    onClick={e => {
                      e.stopPropagation()
                    }}>
                    <IoEllipsisHorizontal />
                  </IconButton>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  alignOffset={24}
                  className="size-36 p-0 dark:bg-neutral-900">
                  <div className="size-full"></div>
                </PopoverContent>
              </Popover>
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
