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
      displayName: "Sapphire Pineapple",
      avatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"
    }]
  }
}

export const TwoUsers: Story = {
  render,
  args: {
    users: [{
      color: "#24B481",
      displayName: "Crimson Maple",
      avatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"
    },
    {
      color: "#7EC1FF",
      displayName: "Azure Stream",
      avatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"
    }]
  }
}

export const ThreeUsers: Story = {
  render,
  args: {
    users: [{
      color: "#24B481",
      displayName: "Crimson Maple",
      avatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"
    },
    {
      color: "#7EC1FF",
      displayName: "Azure Stream",
      avatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"
    },
    {
      color: "#E57EFF",
      displayName: "Sapphire Pineapple",
      avatarUrl: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg"
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
