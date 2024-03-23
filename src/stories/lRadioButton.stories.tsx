import {type Meta, type StoryObj} from "@storybook/react"
import RadioButton, {type RadioButtonProps} from "../components/LRadioButton"

type Story = StoryObj<typeof RadioButton>

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
}
const render = (args: RadioButtonProps) => <RadioButton {...args} />

export const Default: Story = {
  render,
  args: {
    label: "RadioButton",
    name: "",
    id: "",
    key: "",
    value: "",
    onClick: () => {
      alert("Checked!!!")
    },
  },
}

export default meta
