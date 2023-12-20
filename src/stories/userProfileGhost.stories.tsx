import {type Meta, type StoryObj} from "@storybook/react"
import UserProfileGhost, {
  type UserProfileGhostProps,
} from "../components/UserProfileGhost"

type Story = StoryObj<typeof UserProfileGhost>

const meta: Meta<typeof UserProfileGhost> = {component: UserProfileGhost}
const render = (args: UserProfileGhostProps) => <UserProfileGhost {...args} />

export const Default: Story = {
  render,
  args: {
    count: 4,
    opacityMultiplier: 0.2,
  },
}

export default meta
