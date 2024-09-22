import EventGroupMessage, {
  EventShortenerType,
  type EventGroupMessageProps,
} from "@/components/EventGroupMessage"
import {type EventMessageData} from "@/components/EventMessage"
import {type Meta, type StoryObj} from "@storybook/react"
import {EventType, RoomMemberEvent} from "matrix-js-sdk"
import React from "react"

type Story = StoryObj<typeof EventGroupMessage>

const meta: Meta<typeof EventGroupMessage> = {
  component: EventGroupMessage,
}

const displayName = "Sapphire Pineapple"
const userId = "@sapphire_pineapple"

export const DummyEvents: EventMessageData[] = [
  {
    body: "has change the name to Snappy Turtle",
    sender: {
      displayName,
      userId,
    },
    timestamp: Date.now(),
    eventId: "change-name-1",
    type: RoomMemberEvent.Name,
  },
  {
    body: "has put a profile photo",
    sender: {
      displayName,
      userId,
    },
    timestamp: Date.now(),
    eventId: "put-profile-photo-1",
    type: EventType.RoomMember,
  },
  {
    body: "remove profile photo",
    sender: {
      displayName,
      userId,
    },
    timestamp: Date.now(),
    eventId: "remove-profile-photo-1",
    type: EventType.RoomMember,
  },
]

const render = (args: EventGroupMessageProps): React.JSX.Element => (
  <EventGroupMessage {...args} />
)

export const Default: Story = {
  render,
  args: {
    eventGroupMainBody: {
      shortenerType: EventShortenerType.PersonalInfo,
      sender: {
        displayName,
        userId,
      },
    },
    eventMessages: DummyEvents,
    onFindUser() {},
    onShowMember() {},
  },
}

export default meta
