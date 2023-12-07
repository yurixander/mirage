import {Meta, StoryObj} from "@storybook/react"
import Checkbox, {CheckboxProps} from "../components/Checkbox"

type Story = StoryObj<typeof Checkbox>

const meta: Meta<typeof Checkbox> = {component: Checkbox}
const render = (args: CheckboxProps) => <Checkbox {...args} />

export const WithoutLabel: Story = {
  render,
  args: {
    isInitiallySelected: false,
    onSelectionChange: _isSelected => { }
  }
}

export const WithLabel: Story = {
  render,
  args: {
    isInitiallySelected: false,
    label: "This is a checkbox",
    onSelectionChange: _isSelected => { }
  }
}

export default meta