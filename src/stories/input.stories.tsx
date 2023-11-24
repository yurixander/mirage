import {Meta, StoryObj} from "@storybook/react"
import Input, {InputProps, integerConstraint, InputAction} from "../components/Input"
import {ReactComponent as LocationIcon} from "../../public/icons/dms.svg"
import {ReactComponent as SearchIcon} from "../../public/icons/search.svg"

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
    icon: <LocationIcon />
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
        icon: SearchIcon
      },
      {
        tooltip: "Location",
        onClick: () => { },
        icon: LocationIcon
      }
    ]
  }
}


export default meta
