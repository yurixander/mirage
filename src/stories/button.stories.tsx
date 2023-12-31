import {type Meta, type StoryObj} from "@storybook/react"
import Button, {type ButtonProps, ButtonStyle} from "../components/Button"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {component: Button}
const render = (args: ButtonProps) => <Button {...args} />

export const Primary: Story = {
  render,
  args: {
    text: "This is a button",
    style: ButtonStyle.Primary,
    onClick: () => {},
  },
}

export const Green: Story = {
  render,
  args: {
    text: "This is a button",
    style: ButtonStyle.Green,
    onClick: () => {},
  },
}

export const Disabled: Story = {
  render,
  args: {
    text: "This is a button",
    isDisabled: true,
    style: ButtonStyle.Default,
    onClick: () => {},
  },
}

export const Default: Story = {
  render,
  args: {
    text: "This is a button",
    style: ButtonStyle.Default,
    onClick: () => {},
  },
}

export default meta
