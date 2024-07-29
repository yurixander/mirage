import {type Meta, type StoryObj} from "@storybook/react"
import TypingIndicator, {
  type TypingIndicatorProps,
} from "../components/TypingIndicator"
import React from "react"

type Story = StoryObj<typeof TypingIndicator>

const meta: Meta<typeof TypingIndicator> = {component: TypingIndicator}

const render = (args: TypingIndicatorProps): React.JSX.Element => (
  <TypingIndicator {...args} />
)

const defaultAvatarUrl =
  "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const displayNameOne = "Sapphire Pineapple"

export const OneUser: Story = {
  render,
  args: {
    users: [
      {
        userId: "@emerald_branch",
        displayName: displayNameOne,
        avatarUrl: defaultAvatarUrl,
      },
    ],
  },
}

export const TwoUsers: Story = {
  render,
  args: {
    users: [
      {
        userId: "@crimson_maple",
        displayName: "Crimson Maple",
        avatarUrl: defaultAvatarUrl,
      },
      {
        userId: "@azure_stream",
        displayName: "Azure Stream",
        avatarUrl: defaultAvatarUrl,
      },
    ],
  },
}

export const ThreeUsers: Story = {
  render,
  args: {
    users: [
      {
        userId: "@crimson_maple",
        displayName: "Crimson Maple",
      },
      {
        userId: "@azure_stream",
        displayName: "Azure Stream",
      },
      {
        userId: "@emerald_branch",
        displayName: displayNameOne,
      },
    ],
  },
}

export const SeveralPeople: Story = {
  render,
  args: {
    users: [
      {
        userId: "@emerald_branch1",
        displayName: displayNameOne,
        avatarUrl: defaultAvatarUrl,
      },
      {
        userId: "@emerald_branch2",
        displayName: displayNameOne,
      },
      {
        userId: "@emerald_branch4",
        displayName: displayNameOne,
      },
      {
        userId: "@emerald_branch5",
        displayName: displayNameOne,
      },
    ],
  },
}

export default meta
