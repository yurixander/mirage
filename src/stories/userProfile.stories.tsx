import {type Meta, type StoryObj} from "@storybook/react"
import UserProfile, {
  UserActivity,
  type UserProfileProps,
  UserStatus,
} from "../components/UserProfile"
import {faSpotify} from "@fortawesome/free-brands-svg-icons"

type Story = StoryObj<typeof UserProfile>

const meta: Meta<typeof UserProfile> = {component: UserProfile}
const render = (args: UserProfileProps) => <UserProfile {...args} />

export const Offline: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "@emerald_branch",
    status: UserStatus.OFFLINE,
    isLarge: false,
  },
}

export const Online: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "@emerald_branch",
    status: UserStatus.ONLINE,
    isLarge: false,
  },
}

export const Idle: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "@emerald_branch",
    status: UserStatus.IDLE,
    isLarge: false,
  },
}

export const WithActivityIcon: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "Listening to Spotify",
    status: UserStatus.IDLE,
    activity: UserActivity.LISTENING,
    icon: faSpotify,
    platform: "Spotify",
    isLarge: false,
  },
}

export const Large: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "Online",
    status: UserStatus.IDLE,
    isLarge: true,
  },
}

export default meta
