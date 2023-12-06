import {Meta, StoryObj} from "@storybook/react"
import Checkbox, {CheckBoxProps} from "../components/Checkbox"

type Story = StoryObj<typeof Checkbox>

const meta: Meta<typeof Checkbox> = {component: Checkbox}
const render = (args: CheckBoxProps) => <Checkbox {...args} />

export const Default: Story = {
  render,
  args: {
    isSelected: false,
    onClick: () => { }
  }
}

export const Selected: Story = {
  render,
  args: {
    isSelected: true,
    onClick: () => { }
  }
}

export default meta
