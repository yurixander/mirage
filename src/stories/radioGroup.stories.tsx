import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import RadioGroup, {type RadioGroupProps} from "../components/RadioGroup"

type Story = StoryObj<typeof RadioGroup>

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
}

const render = (args: RadioGroupProps): React.JSX.Element => (
  <RadioGroup {...args} />
)

export const Default: Story = {
  render,
  args: {
    items: [
      {
        label: "Item A",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        value: "",
      },
      {
        label: "Item B",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        value: "",
      },
      {
        label: "Item C",
        name: "radiobutton",
        onClick: () => {},
        id: "",
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
        value: "",
      },
      {
        label: "Item B",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        value: "",
      },
      {
        label: "Item C",
        name: "radiobutton",
        onClick: () => {},
        id: "",
        value: "",
      },
    ],
    className: "flex-row",
  },
}

export default meta
