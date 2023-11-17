import {Meta, StoryObj} from "@storybook/react"
import ServerListItem, {ServerListItemProps} from "../components/ServerListItem"

type Story = StoryObj<typeof ServerListItem>

const meta: Meta<typeof ServerListItem> = {component: ServerListItem}
const render = (args: ServerListItemProps) => <ServerListItem {...args} />

export const Default: Story = {
  render,
  args: {
    isActive: false,
    onClick: () => { },
    tooltip: "Server 1",
    tooltipPlacement: "auto"
  }
}

export const Selected: Story = {
  render,
  args: {
    isActive: true,
    onClick: () => { },
    tooltip: "Server 2",
    tooltipPlacement: "auto"
  }
}

export default meta
