import {Meta, StoryObj} from "@storybook/react"
import NotificationDot, {NotificationDotProps} from "../components/NotificationDot"

type Story = StoryObj<typeof NotificationDot>

const meta: Meta<typeof NotificationDot> = {component: NotificationDot}

export const Default: Story = {
  render: (args: NotificationDotProps) => <NotificationDot {...args} />,
  args: {
    amount: 2
  }
} 

export const AtOrOver100: Story = {
  render: (args: NotificationDotProps) => <NotificationDot {...args} />,
  args: {
    amount: 100
  }
}

export default meta