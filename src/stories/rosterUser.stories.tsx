import {Meta, StoryObj} from "@storybook/react"
import RosterUser, {RosterUserProps} from "../components/RosterUser"
import {UserActivity, UserStatus} from "../components/UserProfile"
import {faSpotify} from "@fortawesome/free-brands-svg-icons"

type Story = StoryObj<typeof RosterUser>

const meta: Meta<typeof RosterUser> = {component: RosterUser}
const render = (args: RosterUserProps) => <RosterUser {...args} />

export const WithActivity: Story = {
  render,
  args: {
    userProfileProps: {
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      text: " ",
      status: UserStatus.Idle,
      activity: UserActivity.Listening,
      icon: faSpotify,
      platform: "Spotify",
      isLarge: false
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
      isLarge: false
    },
    onClick: () => { }
  }
}

export default meta
