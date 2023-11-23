import {Meta, StoryObj} from "@storybook/react"
import Input, {InputProps, integerConstraint, InputAction} from "../components/Input"
import {ReactComponent as SendIcon} from "../../public/icons/dms.svg"
import {ReactComponent as Search} from "../../public/icons/search.svg"

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

export const WithIcon: Story = {
  render,
  args: {
    placeholder: "Integers only",
    icon: <SendIcon />
  }
}

export const WithActions: Story = {
  render,
  args: {
    placeholder: "This is an input",
    actions: [
      {
        tooltip: "Send message",
        onClick: () => { },
        icon: Search
      },
      {
        tooltip: "Send message",
        onClick: () => { },
        icon: Search
      }
    ]
  }
}


export default meta
