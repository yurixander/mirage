import {Meta, StoryObj} from "@storybook/react"
import TypingIndicator, {TypingIndicatorProps} from "../components/TypingIndicator"

type Story = StoryObj<typeof TypingIndicator>

const meta: Meta<typeof TypingIndicator> = {component: TypingIndicator}
const render = (args: TypingIndicatorProps) => <TypingIndicator {...args} />

export const OneUser: Story = {
  render,
  args: {
    users: [{
      color: "#5CC679",
      displayName: "Sapphire Pineapple"
    }]
  }
}

export const SeveralPeople: Story = {
  render,
  args: {
    users: [
      {
        color: "#5CC679",
        displayName: "Sapphire Pineapple"
      },
      {
        color: "#5CC679",
        displayName: "Sapphire Pineapple"
      },
      {
        color: "#5CC679",
        displayName: "Sapphire Pineapple"
      },
      {
        color: "#5CC679",
        displayName: "Sapphire Pineapple"
      }
    ]
  }
}

export default meta
