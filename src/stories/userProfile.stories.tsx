import {type Meta, type StoryObj} from "@storybook/react"
import UserProfile, {type UserProfileProps} from "../components/UserProfile"
import {IoHeadsetSharp} from "react-icons/io5"
import React from "react"
import {Text} from "@/components/ui/typography"

type Story = StoryObj<typeof UserProfile>

const meta: Meta<typeof UserProfile> = {component: UserProfile}
const render = (args: UserProfileProps): React.JSX.Element => (
  <UserProfile {...args} />
)

const displayName = "Emerald Branch"
const username = "@emerald_branch"

export const Default: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    children: <Text size="1">{username}</Text>,
    isLarge: false,
  },
}

export const WithActivityIcon: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    isLarge: false,
    children: (
      <Text className="flex items-center gap-1" size="1">
        Listening to <b>Spotify</b> <IoHeadsetSharp size={12} />
      </Text>
    ),
  },
}

export const Large: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    children: <Text>Last presence age 4:00pm</Text>,
    isLarge: true,
  },
}

export default meta
