import {type Meta, type StoryObj} from "@storybook/react"
import UnreadIndicator from "../components/UnreadIndicator"
import React from "react"

type Story = StoryObj<typeof UnreadIndicator>

const meta: Meta<typeof UnreadIndicator> = {component: UnreadIndicator}

const render = (): React.JSX.Element => (
  <UnreadIndicator lastReadEventId="unread-indicator" />
)

export const Default: Story = {
  render,
}

export default meta
