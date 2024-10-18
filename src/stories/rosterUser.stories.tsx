import type {Meta, StoryObj} from "@storybook/react"
import RosterUser, {type RosterUserProps} from "../containers/Roster/RosterUser"
import type React from "react"
import {UserPowerLevel} from "@/utils/members"

type Story = StoryObj<typeof RosterUser>

const meta: Meta<typeof RosterUser> = {component: RosterUser}

const render = (args: RosterUserProps): React.JSX.Element => (
  <RosterUser {...args} />
)

export const Default: Story = {
  render,
  args: {
    className: "max-w-52",
    displayName: "Emerald Branch",
    lastPresenceAge: Date.now(),
    userId: "@emerald_branch",
    powerLevel: UserPowerLevel.Admin,
    onUserClick: () => {
      throw new Error("Function not implemented.")
    },
  },
}

export const WithImage: Story = {
  render,
  args: {
    className: "max-w-52",
    displayName: "Emerald Branch",
    lastPresenceAge: Date.now(),
    userId: "@emerald_branch",
    powerLevel: UserPowerLevel.Admin,
    avatarUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    onUserClick: () => {
      throw new Error("Function not implemented.")
    },
  },
}

export default meta
