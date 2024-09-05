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

export const Default: Story = {
  render,
  args: {
    members,
    isLoading: false,
    onUserClick(userId) {
      throw new Error("Function not implemented.")
    },
  },
}

export const Loading: Story = {
  render,
  args: {
    members: [],
    isLoading: true,
    onUserClick(userId) {
      throw new Error("Function not implemented.")
    },
  },
}

export default meta
