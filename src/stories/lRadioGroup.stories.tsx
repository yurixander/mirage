import {type Meta, type StoryObj} from "@storybook/react"
import LRadioGroup, {
  LRadioGroupDirection,
  type LRadioGroupProps,
} from "../components/LRadioGroup"

type Story = StoryObj<typeof LRadioGroup>

const meta: Meta<typeof LRadioGroup> = {
  component: LRadioGroup,
}
const render = (args: LRadioGroupProps) => <LRadioGroup {...args} />

export const Default: Story = {
  render,
  args: {
    items: [
      {label: "Item A", name: "radiobutton", onClick: () => {}},
      {label: "Item B", name: "radiobutton", onClick: () => {}},
      {label: "Item C", name: "radiobutton", onClick: () => {}},
    ],
  },
}

export const IsRow: Story = {
  render,
  args: {
    items: [
      {label: "Item A", name: "radiobutton", onClick: () => {}},
      {label: "Item B", name: "radiobutton", onClick: () => {}},
      {label: "Item C", name: "radiobutton", onClick: () => {}},
    ],
    isColum: LRadioGroupDirection.Row,
  },
}

export default meta
