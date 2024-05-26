import {type Meta, type StoryObj} from "@storybook/react"
import ServerDropdown from "../components/ServerDropdown"

type Story = StoryObj<typeof ServerDropdown>

const meta: Meta<typeof ServerDropdown> = {
  component: ServerDropdown,
}
const render = () => <ServerDropdown />

export const Default: Story = {
  render,
  args: {},
}

export default meta
