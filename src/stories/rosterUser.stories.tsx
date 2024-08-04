import {type Meta, type StoryObj} from "@storybook/react"
import RosterUser, {type RosterUserProps} from "../containers/Roster/RosterUser"
import React from "react"

type Story = StoryObj<typeof RosterUser>

const meta: Meta<typeof RosterUser> = {component: RosterUser}

const render = (args: RosterUserProps): React.JSX.Element => (
  <RosterUser {...args} />
)

export const Default: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    lastPresenceAge: Date.now(),
    userId: "@emerald_branch",
    onUserClick: () => {},
  },
}

export default meta
