import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import NotificationIndicator, {
  type NotificationIndicatorProps,
} from "../components/NotificationIndicator"

type Story = StoryObj<typeof NotificationIndicator>

const meta: Meta<typeof NotificationIndicator> = {
  component: NotificationIndicator,
}
const render = (args: NotificationIndicatorProps): React.JSX.Element => (
  <NotificationIndicator {...args} />
)

export const WithMentions: Story = {
  render,
  args: {mentionAmount: 2},
}

export const Unread: Story = {
  render,
  args: {mentionAmount: undefined},
}

export const AtOrOver100Mentions: Story = {
  render,
  args: {mentionAmount: 100},
}

export default meta
