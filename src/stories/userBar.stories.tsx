import {Meta, StoryObj} from "@storybook/react"
import UserBar, {UserBarProps} from "../components/UserBar"
import {UserStatus} from "../components/UserProfile"

type Story = StoryObj<typeof UserBar>

const meta: Meta<typeof UserBar> = {component: UserBar}
const render = (args: UserBarProps) => <UserBar {...args} />

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
