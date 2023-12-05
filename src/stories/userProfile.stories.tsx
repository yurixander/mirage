import {Meta, StoryObj} from "@storybook/react"
import UserProfile, {UserActivity, UserProfileProps, UserStatus} from "../components/UserProfile"
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
    status: UserStatus.Offline,
    isLarge: false
  }
}

export const Online: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "@emerald_branch",
    status: UserStatus.Online,
    isLarge: false
  }
}

export const Idle: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "@emerald_branch",
    status: UserStatus.Idle,
    isLarge: false
  }
}

export const WithActivityIcon: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "Listening to Spotify",
    status: UserStatus.Idle,
    activity: UserActivity.Listening,
    icon: faSpotify,
    platform: "Spotify",
    isLarge: false
  }
}

export const Large: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "Online",
    status: UserStatus.Idle,
    isLarge: true
  }
}

export default meta
