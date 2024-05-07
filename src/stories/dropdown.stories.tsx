import {type Meta, type StoryObj} from "@storybook/react"
import Dropdown, {type DropdownProps} from "../components/Dropdown"
import {IoAccessibility, IoAdd, IoFlame} from "react-icons/io5"

type Story = StoryObj<typeof Dropdown>

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
}
const render = (args: DropdownProps) => <Dropdown {...args} />

export const Default: Story = {
  render,
  args: {
    options: [
      {label: "Option 1", Icon: IoFlame, onClick: () => {}},
      {label: "Option 2", Icon: IoAdd, onClick: () => {}},
      {label: "Option 3", Icon: IoAccessibility, onClick: () => {}},
    ],
  },
}

export default meta
