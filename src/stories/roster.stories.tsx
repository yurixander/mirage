import {type GroupedMembers} from "@/containers/Roster/hooks/useRoomMembers"
import Roster, {type RosterProps} from "@/containers/Roster/Roster"
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

const groupedMembers: GroupedMembers = {
  admins: [
    {
      ...commonUserData,
      powerLevel: UserPowerLevel.Admin,
    },
  ],
  members: [
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
  ],
  moderators: [],
}

export const Default: Story = {
  render,
  args: {
    groupedMembers,
    isLoading: false,
    onReloadMembers() {},
    onUserClick(_userId) {},
  },
}

export const WithGhosts: Story = {
  render,
  args: {
    groupedMembers,
    isLoading: false,
    onReloadMembers() {},
    onUserClick(_userId) {},
  },
}

export const Loading: Story = {
  render,
  args: {
    groupedMembers,
    isLoading: true,
    onReloadMembers() {},
    onUserClick(_userId) {},
  },
}

export const Error: Story = {
  render,
  args: {
    groupedMembers,
    isLoading: false,
    onReloadMembers() {},
    onUserClick(_userId) {},
  },
}

export default meta
