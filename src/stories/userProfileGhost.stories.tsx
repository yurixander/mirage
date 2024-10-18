import type {Meta, StoryObj} from "@storybook/react"
import UserProfileGhost, {
  type UserProfileGhostProps,
} from "../components/UserProfileGhost"
import type React from "react"

type Story = StoryObj<typeof UserProfileGhost>

const meta: Meta<typeof UserProfileGhost> = {component: UserProfileGhost}

const render = (args: UserProfileGhostProps): React.JSX.Element => (
  <UserProfileGhost {...args} />
)

export const Default: Story = {
  render,
  args: {
    count: 4,
    opacityMultiplier: 0.2,
  },
}

export default meta
