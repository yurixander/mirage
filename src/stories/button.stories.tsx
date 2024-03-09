import {type Meta, type StoryObj} from "@storybook/react"
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  type ButtonProps as ButtonProperties,
} from "../components/Button"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {component: Button}
const render = (arguments_: ButtonProperties) => <Button {...arguments_} />

export const Primary: Story = {
  render,
  args: {
    label: "Primary button",
    variant: ButtonVariant.Primary,
    onClick: () => {},
  },
}

export const PrimaryBlack: Story = {
  render,
  args: {
    label: "Primary button",
    variant: ButtonVariant.Primary,
    color: ButtonColor.Black,
    onClick: () => {},
  },
}

export const Secondary: Story = {
  render,
  args: {
    label: "Secondary button",
    variant: ButtonVariant.Secondary,
    onClick: () => {},
  },
}

export const Disabled: Story = {
  render,
  args: {
    label: "Button disabled",
    isDisabled: true,
    variant: ButtonVariant.Primary,
    onClick: () => {},
  },
}

export const Link: Story = {
  render,
  args: {
    label: "Link button",
    variant: ButtonVariant.TextLink,
    onClick: () => {},
  },
}

export const Small: Story = {
  render,
  args: {
    label: "Small button",
    variant: ButtonVariant.Primary,
    size: ButtonSize.Small,
    onClick: () => {},
  },
}

export const SmallBlack: Story = {
  render,
  args: {
    label: "Small button",
    variant: ButtonVariant.Primary,
    color: ButtonColor.Black,
    size: ButtonSize.Small,
    onClick: () => {},
  },
}

export default meta
