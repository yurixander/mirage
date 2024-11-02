import {type Meta, type StoryObj} from "@storybook/react"
import ServerDropdown, {
  type ServerDropdownProps,
} from "../components/ServerDropdown"
import {MATRIX_SERVER} from "@/utils/servers"
import React from "react"

type Story = StoryObj<typeof ServerDropdown>

const meta: Meta<typeof ServerDropdown> = {
  component: ServerDropdown,
}
const render = (args: ServerDropdownProps): React.JSX.Element => (
  <ServerDropdown {...args} />
)

export const Default: Story = {
  render,
  args: {
    initiallyServerSelected: MATRIX_SERVER,
    onServerSelected: _server => {},
  },
}

export default meta
