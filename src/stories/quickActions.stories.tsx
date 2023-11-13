import {Meta, StoryObj} from "@storybook/react"
import QuickActions, {QuickActionsProps} from "../components/QuickActions"

type Story = StoryObj<typeof QuickActions>

const meta: Meta<typeof QuickActions> = {component: QuickActions}
const render = (args: QuickActionsProps) => <QuickActions {...args} />

export const WithMentions: Story = {
  render,
  args: {},
}

export default meta