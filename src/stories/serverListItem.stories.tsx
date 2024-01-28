import {type Meta, type StoryObj} from "@storybook/react"
import ServerListItem, {
  type ServerListItemProps,
} from "../components/ServerListItem"

type Story = StoryObj<typeof ServerListItem>

const meta: Meta<typeof ServerListItem> = {component: ServerListItem}
const render = (args: ServerListItemProps) => <ServerListItem {...args} />

export const Default: Story = {
  render,
  args: {
    isActive: false,
    onClick: () => {},
    tooltip: "Server 1",
  },
}

export const Selected: Story = {
  render,
  args: {
    isActive: true,
    onClick: () => {},
    tooltip: "Server 2",
  },
}

export const WithImg: Story = {
  render,
  args: {
    isActive: true,
    onClick: () => {},
    tooltip: "Server 2",
    avatarUrl:
      "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
}

export default meta
