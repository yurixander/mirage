import {Meta, StoryObj} from "@storybook/react"
import Input, {InputProps, integerConstraint} from "../components/Input"

type Story = StoryObj<typeof Input>

const meta: Meta<typeof Input> = {component: Input}
const render = (args: InputProps) => <Input {...args} />

export const Default: Story = {
  render,
  args: {placeholder: "This is an input"}
}

export const WithIntegerConstraint: Story = {
  render,
  args: {
    placeholder: "Integers only",
    constraints: [integerConstraint]
  }
}

export default meta
