import {Meta, StoryObj} from "@storybook/react"
import UserProfile, {UserProfileProps, UserStatus} from "../components/UserProfile"

type Story = StoryObj<typeof UserProfile>

const meta: Meta<typeof UserProfile> = {component: UserProfile}
const render = (args: UserProfileProps) => <UserProfile {...args} />

export const Default: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    username: "@emerald_branch",
    status: UserStatus.Offline
  }
}

export const Online: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    username: "@emerald_branch",
    status: UserStatus.Online
  }
}

export const Idle: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    displayNameColor: "#5CC679",
    username: "@emerald_branch",
    status: UserStatus.Idle
  }
}

export default meta
