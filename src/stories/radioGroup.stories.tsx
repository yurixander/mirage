import {type Meta, type StoryObj} from "@storybook/react"
import RadioGroup, {
  RadioGroupDirection,
  type RadioGroupProps,
} from "../components/RadioGroup"

type Story = StoryObj<typeof RadioGroup>

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
}
const render = (args: RadioGroupProps) => <RadioGroup {...args} />

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
    isColum: RadioGroupDirection.ROW,
  },
}

export default meta
