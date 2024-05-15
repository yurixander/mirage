import {type Meta, type StoryObj} from "@storybook/react"
import SidebarActions, {
  type SidebarActionsProps as QuickActionsProperties,
} from "../containers/SidebarActions/SidebarActions"

type Story = StoryObj<typeof SidebarActions>

const meta: Meta<typeof SidebarActions> = {component: SidebarActions}

const render = (arguments_: QuickActionsProperties) => (
  <SidebarActions {...arguments_} />
)

export const Default: Story = {
  render,
  args: {},
}

export default meta
