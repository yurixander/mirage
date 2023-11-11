import {Meta, StoryObj} from "@storybook/react"
import Channel, {ChannelProps} from "../components/Channel"

type Story = StoryObj<typeof Channel>

const meta: Meta<typeof Channel> = {component: Channel}

export const Default: Story = {
  render: (args: ChannelProps) => <Channel {...args} />,
  args: {
    name: "Help & guides",
    icon: "string",
    isActive: true,
    mentionAmount: 0,
  }
}

export default meta
