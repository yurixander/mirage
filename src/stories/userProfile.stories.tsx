import {Meta, StoryObj} from "@storybook/react"
import UserProfile, {UserActivity, UserProfileProps, UserStatus} from "../components/UserProfile"
import {ReactComponent as SpotifyIcon} from "../../public/icons/spotify.svg"

type Story = StoryObj<typeof UserProfile>

const meta: Meta<typeof UserProfile> = {component: UserProfile}
const render = (args: UserProfileProps) => <UserProfile {...args} />

export const Default: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "@emerald_branch",
    status: UserStatus.Offline
  }
}

export const Online: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "@emerald_branch",
    status: UserStatus.Online
  }
}

export const Idle: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "@emerald_branch",
    status: UserStatus.Idle
  }
}

export const WithIcon: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    text: "Listening to Spotify",
    status: UserStatus.Idle,
    activity: UserActivity.Listening,
    icon: SpotifyIcon,
    platform: "Spotify"
  }
}

export default meta
