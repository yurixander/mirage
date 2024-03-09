import {type Meta, type StoryObj} from "@storybook/react"
import RadioGroup, {
  RadioGroupDirection,
  type RadioGroupProps as RadioGroupProperties,
} from "../components/RadioGroup"

type Story = StoryObj<typeof RadioGroup>

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
}
const render = (arguments_: RadioGroupProperties) => <RadioGroup {...arguments_} />

export const Default: Story = {
  render,
  args: {
    items: [
      {
        isChecked: false,
        label: "Item 1",
        onClick: () => {},
      },
      {
        isChecked: false,
        label: "Item 2",
        onClick: () => {},
      },
      {
        isChecked: false,
        label: "Item 3",
        onClick: () => {},
      },
    ],
  },
}

export const IsRow: Story = {
  render,
  args: {
    items: [
      {
        isChecked: true,
        label: "Item 1",
        onClick: () => {},
      },
      {
        isChecked: false,
        label: "Item 2",
        onClick: () => {},
      },
      {
        isChecked: false,
        label: "Item 3",
        onClick: () => {},
      },
    ],
    isColum: RadioGroupDirection.Row,
  },
}

export default meta
