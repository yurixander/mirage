import {Meta, StoryObj} from "@storybook/react"
import NotificationDot, {NotificationDotProps} from "../components/NotificationDot"

type Story = StoryObj<typeof NotificationDot>

const meta: Meta<typeof NotificationDot> = {component: NotificationDot}
const render = (args: NotificationDotProps) => <NotificationDot {...args} />

export const WithMentions: Story = {
  render,
  args: {mentionAmount: 2},
}

export const Unread: Story = {
  render,
  args: {mentionAmount: undefined}
}

export const AtOrOver100Mentions: Story = {
  render,
  args: {mentionAmount: 100}
}

export default meta
