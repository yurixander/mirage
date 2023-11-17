import {Meta, StoryObj} from "@storybook/react"
import Button, {ButtonProps, ButtonStyle} from "../components/Button"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {component: Button}
const render = (args: ButtonProps) => <Button {...args} />

export const Primary: Story = {
  render,
  args: {
    text: "This is a button",
    style: ButtonStyle.Primary,
    onClick: () => { },
  }
}

export const Green: Story = {
  render,
  args: {
    text: "This is a button",
    style: ButtonStyle.Green,
    onClick: () => { },
  }
}

export const Default: Story = {
  render,
  args: {
    text: "This is a button",
    style: ButtonStyle.Default,
    onClick: () => { },
  }
}

export default meta
