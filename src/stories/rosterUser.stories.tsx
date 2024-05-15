import {type Meta, type StoryObj} from "@storybook/react"
import RosterUser, {
  type RosterUserProps as RosterUserProperties,
} from "../containers/Roster/RosterUser"

type Story = StoryObj<typeof RosterUser>

const meta: Meta<typeof RosterUser> = {component: RosterUser}
const render = (arguments_: RosterUserProperties) => (
  <RosterUser {...arguments_} />
)

export const Default: Story = {
  render,
  args: {
    displayName: "Emerald Branch",
    lastPresenceAge: Date.now(),
    userId: "@emerald_branch",
    onClick: () => {},
  },
}

export default meta
