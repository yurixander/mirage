import {type Meta, type StoryObj} from "@storybook/react"
import SidebarActions, {
  type SidebarActionsProps,
} from "../containers/NavigationSection/SidebarActions"
import React from "react"

type Story = StoryObj<typeof SidebarActions>

const meta: Meta<typeof SidebarActions> = {component: SidebarActions}

const render = (args: SidebarActionsProps): React.JSX.Element => (
  <SidebarActions {...args} />
)

export const Default: Story = {
  render,
  args: {
    onCalls: () => {},
    onDirectMessages: () => {},
    onExit: () => {},
  },
}

export default meta
