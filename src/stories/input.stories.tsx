import {Meta, StoryObj} from "@storybook/react"
import Input, {InputProps, integerConstraint, InputAction} from "../components/Input"
import {faSearch, faMessage} from '@fortawesome/free-solid-svg-icons'

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
    placeholder: "This is an input",
    icon: faMessage
  }
}

export const WithActions: Story = {
  render,
  args: {
    placeholder: "This is an input",
    actions: [
      {
        tooltip: "Search",
        onClick: () => { },
        icon: faSearch
      },
      {
        tooltip: "Location",
        onClick: () => { },
        icon: faMessage
      }
    ]
  }
}


export default meta
