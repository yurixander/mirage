import {type Meta, type StoryObj} from "@storybook/react"
import RadioGroup, {
  RadioGroupDirection,
  type RadioGroupProps,
} from "../components/LRadioGroup"

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
        label: "Item A",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        key: "",
        value: "",
      },
      {
        label: "Item B",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        key: "",
        value: "",
      },
      {
        label: "Item C",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        key: "",
        value: "",
      },
    ],
  },
}

export const IsRow: Story = {
  render,
  args: {
    items: [
      {
        label: "Item A",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        key: "",
        value: "",
      },
      {
        label: "Item B",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        key: "",
        value: "",
      },
      {
        label: "Item C",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        key: "",
        value: "",
      },
    ],
    isColum: RadioGroupDirection.Row,
  },
}

export default meta
