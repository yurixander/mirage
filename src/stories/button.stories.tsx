import {type Meta, type StoryObj} from "@storybook/react"
import Button, {ButtonVariant, type ButtonProps} from "../components/Button"
import React from "react"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {component: Button}
const render = (args: ButtonProps): React.JSX.Element => <Button {...args} />

export const Primary: Story = {
  render,
  args: {
    label: "Primary button",
    variant: ButtonVariant.Primary,
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
    isSmall: true,
    onClick: () => {},
  },
}

export const Loading: Story = {
  render,
  args: {
    label: "Loading",
    variant: ButtonVariant.Primary,
    isLoading: true,
    onClick: () => {},
  },
}

export const SecondaryLoading: Story = {
  render,
  args: {
    label: "Loading",
    variant: ButtonVariant.Secondary,
    isLoading: true,
    onClick: () => {},
  },
}

export default meta
