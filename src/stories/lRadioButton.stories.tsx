import {type Meta, type StoryObj} from "@storybook/react"
import LRadioButton, {type LRadioButtonProps} from "../components/LRadioButton"

type Story = StoryObj<typeof LRadioButton>

const meta: Meta<typeof LRadioButton> = {
  component: LRadioButton,
}
const render = (args: LRadioButtonProps) => <LRadioButton {...args} />

export const Default: Story = {
  render,
  args: {label: "RadioButton", name: "myradiobutton"},
}

export default meta
