import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import SwitchButton, {type SwitchButtonProps} from "../components/SwitchButton"

type Story = StoryObj<typeof SwitchButton>

const meta: Meta<typeof SwitchButton> = {
  component: SwitchButton,
}
const render = (args: SwitchButtonProps): React.JSX.Element => (
  <SwitchButton {...args} />
)

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
