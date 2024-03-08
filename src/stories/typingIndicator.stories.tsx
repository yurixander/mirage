import {type Meta, type StoryObj} from "@storybook/react"
import TypingIndicator, {
  type TypingIndicatorProps,
} from "../components/TypingIndicator"

type Story = StoryObj<typeof TypingIndicator>

const meta: Meta<typeof TypingIndicator> = {component: TypingIndicator}
const render = (args: TypingIndicatorProps) => <TypingIndicator {...args} />

const defaultAvatarUrl =
  "https://images.unsplash.com/photo-1706285644467-45769812f872?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const displayNameOne = "Sapphire Pineapple"

export const OneUser: Story = {
  render,
  args: {
    users: [
      {
        color: "#5CC679",
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
        color: "#24B481",
        displayName: "Crimson Maple",
        avatarUrl: defaultAvatarUrl,
      },
      {
        color: "#7EC1FF",
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
        color: "#24B481",
        displayName: "Crimson Maple",
        avatarUrl: defaultAvatarUrl,
      },
      {
        color: "#7EC1FF",
        displayName: "Azure Stream",
        avatarUrl: defaultAvatarUrl,
      },
      {
        color: "#E57EFF",
        displayName: displayNameOne,
        avatarUrl: defaultAvatarUrl,
      },
    ],
  },
}

export const SeveralPeople: Story = {
  render,
  args: {
    users: [
      {
        color: "#5CC679",
        displayName: displayNameOne,
      },
      {
        color: "#5CC679",
        displayName: displayNameOne,
      },
      {
        color: "#5CC679",
        displayName: displayNameOne,
      },
      {
        color: "#5CC679",
        displayName: displayNameOne,
      },
    ],
  },
}

export default meta
