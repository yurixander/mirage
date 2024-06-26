import {type Meta, type StoryObj} from "@storybook/react"
import SidebarActions, {
  type SidebarActionsProps,
} from "../containers/NavigationSection/SidebarActions"

type Story = StoryObj<typeof SidebarActions>

const meta: Meta<typeof SidebarActions> = {component: SidebarActions}

const render = (args: SidebarActionsProps) => <SidebarActions {...args} />

export const Default: Story = {
  render,
  args: {
    onCalls: () => {},
    onDirectMessages: () => {},
    onNotification: () => {},
    onExit: () => {},
  },
}

export default meta
