import {MATRIX_SERVER} from "@/utils/servers"
import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import ServerDropdown, {
  type ServerDropdownProps,
} from "../components/ServerDropdown"

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
    onServerSelected: () => {},
  },
}

export default meta
