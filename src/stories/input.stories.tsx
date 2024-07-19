import {type Meta, type StoryObj} from "@storybook/react"
import Input, {
  type InputProps as InputProperties,
  integerConstraint,
  nonEmptyConstraint,
  urlConstraint,
  userIdConstraint,
} from "../components/Input"
import {IoArrowUndo, IoTrash, IoArrowRedo} from "react-icons/io5"
import React from "react"

type Story = StoryObj<typeof Input>

const meta: Meta<typeof Input> = {component: Input}
const render = (args: InputProperties): React.JSX.Element => <Input {...args} />

export const Default: Story = {
  render,
  args: {placeholder: "This is a default input"},
}

export const AllConstraint: Story = {
  render,
  args: {
    placeholder: "All constraint",
    constraints: [
      integerConstraint,
      userIdConstraint,
      nonEmptyConstraint,
      urlConstraint,
    ],
  },
}

export const WithIntegerConstraint: Story = {
  render,
  args: {
    placeholder: "Integers only",
    constraints: [integerConstraint],
  },
}

export const WithUserIdConstraint: Story = {
  render,
  args: {
    placeholder: "UserId only",
    constraints: [userIdConstraint],
  },
}

export const WithNonEmptyConstraint: Story = {
  render,
  args: {
    placeholder: "NonEmpty only",
    constraints: [nonEmptyConstraint],
  },
}

export const WithUrlConstraint: Story = {
  render,
  args: {
    placeholder: "Url only",
    constraints: [urlConstraint],
  },
}

export const WithIcon: Story = {
  render,
  args: {
    placeholder: "This is an input with icon",
    Icon: IoArrowRedo,
  },
}

export const Disabled: Story = {
  render,
  args: {
    placeholder: "This is an input disabled",
    Icon: IoTrash,
    isDisabled: true,
  },
}

export const WithActions: Story = {
  render,
  args: {
    placeholder: "This is an input with actions",
    actions: [
      {
        tooltip: "Paste",
        onClick: () => {},
        icon: IoArrowUndo,
      },
      {
        tooltip: "Show pass",
        onClick: () => {},
        icon: IoTrash,
      },
    ],
  },
}

export default meta
