import {type Meta, type StoryObj} from "@storybook/react"
import UserCard, {type UserCardProps} from "../components/UserCard"
import React from "react"

type Story = StoryObj<typeof UserCard>

const date = new Date().getDate()

const meta: Meta<typeof UserCard> = {component: UserCard}

const render = (args: UserCardProps): React.JSX.Element => (
  <UserCard {...args} />
)

export const Default: Story = {
  render,
  args: {
    userProfileProps: {
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      children: <span>Online</span>,
      isLarge: true,
    },
    aboutMe:
      "👋 Hey there! I'm a natural born adventurer who loves exploring the intricacies of daily life. I sure hope we can be friends! 🥳",
    accountCreationTime: date,
    lastMessageTime: date,
    serverJoinTime: date,
  },
}

export default meta
