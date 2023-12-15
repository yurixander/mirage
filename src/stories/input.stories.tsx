import {Meta, StoryObj} from "@storybook/react"
import Input, {InputProps, integerConstraint, nonEmptyConstraint, urlConstraint, userIdConstraint} from "../components/Input"
import {
  faSearch, faCircleUser, faEyeSlash, faPaste
} from "@fortawesome/free-solid-svg-icons"

type Story = StoryObj<typeof Input>

const meta: Meta<typeof Input> = {component: Input}
const render = (args: InputProps) => <Input {...args} />

export const Default: Story = {
  render,
  args: {placeholder: "This is an input"}
}

export const AllConstraint: Story = {
  render,
  args: {
    placeholder: "All constraint",
    constraints: [integerConstraint, userIdConstraint, nonEmptyConstraint, urlConstraint]
  }
}

export const WithIntegerConstraint: Story = {
  render,
  args: {
    placeholder: "Integers only",
    constraints: [integerConstraint]
  }
}

export const WithUserIdConstraint: Story = {
  render,
  args: {
    placeholder: "UserId only",
    constraints: [userIdConstraint]
  }
}

export const WithNonEmptyConstraint: Story = {
  render,
  args: {
    placeholder: "NonEmpty only",
    constraints: [nonEmptyConstraint]
  }
}

export const WithUrlConstraint: Story = {
  render,
  args: {
    placeholder: "Url only",
    constraints: [urlConstraint]
  }
}

export const WithIcon: Story = {
  render,
  args: {
    placeholder: "This is an input",
    icon: faCircleUser
  }
}

export const Disabled: Story = {
  render,
  args: {
    placeholder: "This is an input",
    icon: faSearch,
    isDisabled: true
  }
}

export const WithActions: Story = {
  render,
  args: {
    placeholder: "This is an input",
    actions: [
      {
        tooltip: "Paste",
        onClick: () => { },
        icon: faPaste
      },
      {
        tooltip: "Show pass",
        onClick: () => { },
        icon: faEyeSlash
      }
    ]
  }
}


export default meta
