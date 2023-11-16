import {Meta, StoryObj} from "@storybook/react"
import UserProfileGhost, {UserProfileGhostProps} from "../components/UserProfileGhost"

type Story = StoryObj<typeof UserProfileGhost>

const meta: Meta<typeof UserProfileGhost> = {component: UserProfileGhost}
const render = (args: UserProfileGhostProps) => <UserProfileGhost {...args} />

export const Default: Story = {
  render,
  args: {
    count: 4,
    opacityMultiplier: 0.20
  }
}

export default meta
