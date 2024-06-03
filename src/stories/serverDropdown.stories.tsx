import {type Meta, type StoryObj} from "@storybook/react"
import ServerDropdown, {
  type ServerDropdownProps,
} from "../components/ServerDropdown"

type Story = StoryObj<typeof ServerDropdown>

const meta: Meta<typeof ServerDropdown> = {
  component: ServerDropdown,
}
const render = (args: ServerDropdownProps) => <ServerDropdown {...args} />

export const Default: Story = {
  render,
  args: {
    onServerSelected: server => {},
  },
}

export default meta
