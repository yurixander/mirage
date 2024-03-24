import {type Meta, type StoryObj} from "@storybook/react"
import RadioButton, {type RadioButtonProps} from "../components/RadioButton"

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
    value: "",
    onClick: () => {
      // TODO
    },
  },
}

export default meta
