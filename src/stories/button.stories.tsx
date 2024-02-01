import {type Meta, type StoryObj} from "@storybook/react"
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  type ButtonProps,
} from "../components/Button"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {component: Button}
const render = (args: ButtonProps) => <Button {...args} />

export const Primary: Story = {
  render,
  args: {
    label: "Primary button",
    variant: ButtonVariant.PRIMARY,
    onClick: () => {},
  },
}

export const PrimaryBlack: Story = {
  render,
  args: {
    label: "Primary button",
    variant: ButtonVariant.PRIMARY,
    color: ButtonColor.BLACK,
    onClick: () => {},
  },
}

export const Secondary: Story = {
  render,
  args: {
    label: "Secondary button",
    variant: ButtonVariant.SECONDARY,
    onClick: () => {},
  },
}

export const Disabled: Story = {
  render,
  args: {
    label: "Button disabled",
    isDisabled: true,
    variant: ButtonVariant.PRIMARY,
    onClick: () => {},
  },
}

export const Link: Story = {
  render,
  args: {
    label: "Link button",
    variant: ButtonVariant.TEXT_LINK,
    onClick: () => {},
  },
}

export const Small: Story = {
  render,
  args: {
    label: "Small button",
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.SMALL,
    onClick: () => {},
  },
}

export const SmallBlack: Story = {
  render,
  args: {
    label: "Small button",
    variant: ButtonVariant.PRIMARY,
    color: ButtonColor.BLACK,
    size: ButtonSize.SMALL,
    onClick: () => {},
  },
}

export default meta
