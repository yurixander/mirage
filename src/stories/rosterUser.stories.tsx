import {type Meta, type StoryObj} from "@storybook/react"
import RosterUser, {type RosterUserProps} from "../components/RosterUser"
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
      status: UserStatus.IDLE,
      activity: UserActivity.LISTENING,
      icon: faSpotify,
      platform: "Spotify",
      isLarge: false,
    },
    onClick: () => {},
  },
}

export const NoActivity: Story = {
  render,
  args: {
    userProfileProps: {
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      status: UserStatus.ONLINE,
      text: "Online",
      isLarge: false,
    },
    onClick: () => {},
  },
}

export default meta
