import {type Meta, type StoryObj} from "@storybook/react"
import UserProfile, {
  UserActivity,
  type UserProfileProps as UserProfileProperties,
  UserStatus,
} from "../components/UserProfile"
import {IoHeadsetSharp} from "react-icons/io5"

type Story = StoryObj<typeof UserProfile>

const meta: Meta<typeof UserProfile> = {component: UserProfile}
const render = (arguments_: UserProfileProperties) => (
  <UserProfile {...arguments_} />
)

const displayName = "Emerald Branch"
const username = "@emerald_branch"

export const Offline: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    text: username,
    status: UserStatus.Offline,
    isLarge: false,
  },
}

export const Online: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    text: username,
    status: UserStatus.Online,
    isLarge: false,
  },
}

export const Idle: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    text: username,
    status: UserStatus.Idle,
    isLarge: false,
  },
}

export const WithActivityIcon: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    text: "Listening to Spotify",
    status: UserStatus.Idle,
    activity: UserActivity.Listening,
    icon: <IoHeadsetSharp />,
    platform: "Spotify",
    isLarge: false,
  },
}

export const Large: Story = {
  render,
  args: {
    displayName,
    displayNameColor: "#5CC679",
    text: "Online",
    status: UserStatus.Idle,
    isLarge: true,
  },
}

export default meta
