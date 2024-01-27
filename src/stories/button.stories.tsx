import {type Meta, type StoryObj} from "@storybook/react"
import Button, {ButtonVariant, type ButtonProps} from "../components/Button"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {component: Button}
const render = (args: ButtonProps) => <Button {...args} />

export const Primary: Story = {
  render,
  args: {
    label: "This is a button",
    variant: ButtonVariant.Primary,
    onClick: () => {},
  },
}

export const Green: Story = {
  render,
  args: {
    label: "This is a button",
    variant: ButtonVariant.Green,
    onClick: () => {},
  },
}

export const Disabled: Story = {
  render,
  args: {
    label: "This is a button",
    isDisabled: true,
    variant: ButtonVariant.Default,
    onClick: () => {},
  },
}

export const Default: Story = {
  render,
  args: {
    label: "This is a button",
    variant: ButtonVariant.Default,
    onClick: () => {},
  },
}

export default meta
