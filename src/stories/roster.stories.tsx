import Roster, {type RosterProps} from "@/containers/Roster/Roster"
import {type RosterUserData} from "@/containers/Roster/RosterUser"
import {UserPowerLevel} from "@/utils/members"
import {type Meta, type StoryObj} from "@storybook/react"

type Story = StoryObj<typeof Roster>

const meta: Meta<typeof Roster> = {
  component: Roster,
}

const render = (args: RosterProps): React.JSX.Element => <Roster {...args} />

const commonUserData = {
  displayName: "Emerald Branch",
  userId: "@emerald_branch",
}

const members: RosterUserData[] = [
  {
    ...commonUserData,
    powerLevel: UserPowerLevel.Admin,
  },
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
  {...commonUserData, powerLevel: UserPowerLevel.Member},
]

const errorMsg = "Function not implemented."

export const Default: Story = {
  render,
  args: {
    members,
    isLoading: false,
    onReloadMembers() {},
    onUserClick(userId) {
      throw new Error(errorMsg)
    },
  },
}

export const WithGhosts: Story = {
  render,
  args: {
    members: [
      {...commonUserData, powerLevel: UserPowerLevel.Member},
      {...commonUserData, powerLevel: UserPowerLevel.Member},
      {...commonUserData, powerLevel: UserPowerLevel.Member},
      {...commonUserData, powerLevel: UserPowerLevel.Member},
      {...commonUserData, powerLevel: UserPowerLevel.Member},
      {...commonUserData, powerLevel: UserPowerLevel.Member},
    ],
    isLoading: false,
    isError: false,
    onReloadMembers() {},
    onUserClick(userId) {},
  },
}

export const Loading: Story = {
  render,
  args: {
    members: [],
    isLoading: true,
    onReloadMembers() {},
    onUserClick(userId) {},
  },
}

export const Error: Story = {
  render,
  args: {
    members: [],
    isLoading: false,
    isError: true,
    onReloadMembers() {},
    onUserClick(userId) {},
  },
}

export default meta
