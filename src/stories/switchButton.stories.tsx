import {type Meta, type StoryObj} from "@storybook/react"
import SwitchButton, {type SwitchButtonProps} from "../components/SwitchButton"

type Story = StoryObj<typeof SwitchButton>

const meta: Meta<typeof SwitchButton> = {
  component: SwitchButton,
}
const render = (args: SwitchButtonProps) => <SwitchButton {...args} />

export const Default: Story = {
  render,
  args: {
    label: "This is a switch",
  },
}

export const Disabled: Story = {
  render,
  args: {
    label: "This is a switch",
    isDisabled: true,
  },
}

export default meta
