import {type Meta, type StoryObj} from "@storybook/react"
import Checkbox, {type CheckboxProps} from "../components/Checkbox"
import React from "react"

type Story = StoryObj<typeof Checkbox>

const meta: Meta<typeof Checkbox> = {component: Checkbox}

const render = (args: CheckboxProps): React.JSX.Element => (
  <Checkbox {...args} />
)

export const WithoutLabel: Story = {
  render,
  args: {
    isInitiallySelected: false,
    onSelectionChange: _isSelected => {},
  },
}

export const WithLabel: Story = {
  render,
  args: {
    isInitiallySelected: false,
    label: "This is a checkbox",
    onSelectionChange: _isSelected => {},
  },
}

export const Disabled: Story = {
  render,
  args: {
    isInitiallySelected: false,
    label: "This is a checkbox",
    onSelectionChange: _isSelected => {},
    isDisabled: true,
  },
}

export default meta
