import {Meta, StoryObj} from "@storybook/react"
import UserProfile, {UserProfileProps, UserStatus} from "../components/UserProfile"

type Story = StoryObj<typeof UserProfile>

const meta: Meta<typeof UserProfile> = {component: UserProfile}

export const Default: Story = {
    render: (args: UserProfileProps) => <UserProfile {...args} />,
    args: {
      avatarUrl: "",
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      username: "@emerald_branch",
      status: UserStatus.Offline
    }
  }

  export const Online: Story = {
    render: (args: UserProfileProps) => <UserProfile {...args} />,
    args: {
      avatarUrl: "",
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      username: "@emerald_branch",
      status: UserStatus.Online
    }
  }

  export const Idle: Story = {
    render: (args: UserProfileProps) => <UserProfile {...args} />,
    args: {
      avatarUrl: "",
      displayName: "Emerald Branch",
      displayNameColor: "#5CC679",
      username: "@emerald_branch",
      status: UserStatus.Idle
    }
  }

export default meta