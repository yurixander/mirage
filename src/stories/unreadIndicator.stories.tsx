import {type Meta, type StoryObj} from "@storybook/react"
import UnreadIndicator from "../components/UnreadIndicator"

type Story = StoryObj<typeof UnreadIndicator>

const meta: Meta<typeof UnreadIndicator> = {component: UnreadIndicator}
const render = () => <UnreadIndicator lastReadEventId="unread-indicator" />

export const Default: Story = {
  render,
}

export default meta
