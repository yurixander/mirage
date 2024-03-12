import {type Meta, type StoryObj} from "@storybook/react"
import RosterUser, {
  type RosterUserProps as RosterUserProperties,
} from "../components/RosterUser"
import {UserActivity, UserStatus} from "../components/UserProfile"
import {IoHeadsetSharp} from "react-icons/io5"

type Story = StoryObj<typeof RosterUser>

const meta: Meta<typeof RosterUser> = {component: RosterUser}
const render = (arguments_: RosterUserProperties) => (
  <RosterUser {...arguments_} />
)

export const WithActivity: Story = {
  render,
  args: {
    userProfileProps: {
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      text: " ",
      status: UserStatus.Idle,
      activity: UserActivity.Listening,
      icon: <IoHeadsetSharp />,
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
      status: UserStatus.Online,
      text: "Online",
      isLarge: false,
    },
    onClick: () => {},
  },
}

export default meta
