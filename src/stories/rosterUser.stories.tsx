import {Meta, StoryObj} from "@storybook/react"
import RosterUser, {RosterUserProps} from "../components/RosterUser"
import {UserActivity, UserStatus} from "../components/UserProfile"
import {ReactComponent as SpotifyIcon} from "../../public/icons/spotify.svg"

type Story = StoryObj<typeof RosterUser>

const meta: Meta<typeof RosterUser> = {component: RosterUser}
const render = (args: RosterUserProps) => <RosterUser {...args} />

export const Default: Story = {
  render,
  args: {
    userProfileProps: {
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      text: " ",
      status: UserStatus.Idle,
      activity: UserActivity.Listening,
      icon: SpotifyIcon,
      platform: "Spotify"
    },
    onClick: () => { }
  }
}

export const NoActivity: Story = {
  render,
  args: {
    userProfileProps: {
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      status: UserStatus.Online,
      text: "Online",
    },
    onClick: () => { }
  }
}

export default meta
