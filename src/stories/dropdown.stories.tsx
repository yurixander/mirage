import {type Meta, type StoryObj} from "@storybook/react"
import Dropdown, {type DropdownProps} from "../components/Dropdown"
import Typography from "@/components/Typography"

type Story = StoryObj<typeof Dropdown>

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
}

const render = (args: DropdownProps) => <Dropdown {...args} />

export const Default: Story = {
  render,
  args: {
    initiallyContent: <Typography>Matrix.org</Typography>,
    children: <Typography>Matrix.org</Typography>,
  },
}

export default meta
