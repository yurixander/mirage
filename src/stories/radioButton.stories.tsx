import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import RadioButton, {type RadioButtonProps} from "../components/RadioButton"

type Story = StoryObj<typeof RadioButton>

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
}

const render = (args: RadioButtonProps): React.JSX.Element => (
  <RadioButton {...args} />
)

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
