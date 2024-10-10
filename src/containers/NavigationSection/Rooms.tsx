import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import {IoMdArrowDropdown} from "react-icons/io"

import {cn} from "@/utils/utils"
import {type FC} from "react"
import {Text} from "@/components/ui/typography"
import {type PartialRoom} from "@/hooks/matrix/useSpaceHierarchy"
import Room from "@/components/Room"

type AccordionRoomSectionProps = {
  title: string
  children: React.ReactNode
}

export const AccordionRoomSection: FC<AccordionRoomSectionProps> = ({
  title,
  children,
}) => {
  return (
    <AccordionPrimitive.Item value={title}>
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger className="flex flex-1 items-center gap-0.5 p-1 transition-transform focus-visible:ring [&[data-state=open]>svg]:rotate-180">
          <IoMdArrowDropdown className="size-5 shrink-0 text-neutral-500 transition-transform duration-200" />

          <Text size="1" className="font-bold uppercase text-neutral-500">
            {title}
          </Text>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content className="flex flex-col gap-1 overflow-hidden pl-1 data-[state=open]:animate-accordion-down">
        {children}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
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

  return (
    <AccordionPrimitive.Root
      className={cn("flex flex-col gap-2", className)}
      type="multiple">
      {directs.length > 0 && (
        <AccordionRoomSection title="Chats Directos">
          {directs.map(room => (
            <Room
              key={room.roomId}
              roomName={room.roomName}
              roomId={room.roomId}
              type={room.type}
              emoji={room.emoji}
              onRoomClick={roomId => {}}
            />
          ))}
        </AccordionRoomSection>
      )}

      <AccordionRoomSection title="Habitaciones">
        {groups.map(room => (
          <Room
            key={room.roomId}
            roomName={room.roomName}
            roomId={room.roomId}
            type={room.type}
            emoji={room.emoji}
            onRoomClick={roomId => {}}
          />
        ))}
      </AccordionRoomSection>

      {recommended.length > 0 && (
        <AccordionRoomSection title="Recomendados">
          {recommended.map(room => (
            <Room
              key={room.roomId}
              roomName={room.roomName}
              roomId={room.roomId}
              type={room.type}
              emoji={room.emoji}
              onRoomClick={roomId => {}}
            />
          ))}
        </AccordionRoomSection>
      )}
    </AccordionPrimitive.Root>
  )
}
