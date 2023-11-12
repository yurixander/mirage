import {Meta, StoryObj} from "@storybook/react"
import Channel, {ChannelProps, ChannelType} from "../components/Channel"

type Story = StoryObj<typeof Channel>

const meta: Meta<typeof Channel> = {component: Channel}

export const Default: Story = {
  render: (args: ChannelProps) => <Channel {...args} />,
  args: {
    name: "Help & guides",
    type: ChannelType.Space,
    isActive: true,
    containsUnreadMessages: true,
    mentionCount: 100
  }
}
export const ZeroAmount: Story = {
  render: (args: ChannelProps) => <Channel {...args} />,
  args: {
    name: "Help & guides",
    type: ChannelType.Text,
    isActive: true,
    containsUnreadMessages: true,
    mentionCount: 0
  }
}

export const NonUnreadMessages: Story = {
  render: (args: ChannelProps) => <Channel {...args} />,
  args: {
    name: "Help & guides",
    type: ChannelType.Space,
    isActive: true,
    containsUnreadMessages: false,
    mentionCount: 0
  }
}
export default meta
