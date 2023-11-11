import {Meta, StoryObj} from "@storybook/react"
import NotificationDot, {NotificationDotProps} from "../components/NotificationDot"

type Story = StoryObj<typeof NotificationDot>

const meta: Meta<typeof NotificationDot> = {component: NotificationDot}
const render = (args: NotificationDotProps) => <NotificationDot {...args} />

export const Default: Story = {
  render,
  args: {amount: 2}
}

export const Zero: Story = {
  render,
  args: {amount: 0}
}

export const AtOrOver100: Story = {
  render,
  args: {amount: 100}
}

export default meta
