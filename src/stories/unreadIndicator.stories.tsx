import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import UnreadIndicator from "../components/UnreadIndicator"

type Story = StoryObj<typeof UnreadIndicator>

const meta: Meta<typeof UnreadIndicator> = {component: UnreadIndicator}

const render = (): React.JSX.Element => (
  <UnreadIndicator lastReadEventId="unread-indicator" />
)

export const Default: Story = {
  render,
}

export default meta
