import {type Meta, type StoryObj} from "@storybook/react"
import Dropdown, {type DropdownProps} from "../components/Dropdown"

type Story = StoryObj<typeof Dropdown>

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
}
const render = (args: DropdownProps) => <Dropdown {...args} />

export const Default: Story = {
  render,
  args: {
    options: [
      {label: "Option 1", value: "1", onClick: () => {}},
      {label: "Option 2", value: "2", onClick: () => {}},
      {label: "Option 3", value: "3", onClick: () => {}},
    ],
  },
}

export default meta
