import {type Meta, type StoryObj} from "@storybook/react"
import Checkbox, {type CheckboxProps as CheckboxProperties} from "../components/Checkbox"

type Story = StoryObj<typeof Checkbox>

const meta: Meta<typeof Checkbox> = {component: Checkbox}
const render = (arguments_: CheckboxProperties) => <Checkbox {...arguments_} />

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
