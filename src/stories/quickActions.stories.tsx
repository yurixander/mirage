import {type Meta, type StoryObj} from "@storybook/react"
import QuickActions, {type QuickActionsProps as QuickActionsProperties} from "../components/QuickActions"

type Story = StoryObj<typeof QuickActions>

const meta: Meta<typeof QuickActions> = {component: QuickActions}
const render = (arguments_: QuickActionsProperties) => <QuickActions {...arguments_} />

export const Default: Story = {
  render,
  args: {},
}

export default meta
