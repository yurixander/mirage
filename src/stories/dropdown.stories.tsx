import {type Meta, type StoryObj} from "@storybook/react"
import Typography from "@/components/Typography"
import Dropdown, {type DropdownProps} from "@/components/Dropdown"

type Story = StoryObj<typeof Dropdown>

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
}

const render = (args: DropdownProps) => <Dropdown {...args} />

export const Default: Story = {
  render,
  args: {
    initiallyContent: <Typography>Matrix.org</Typography>,
    children: (
      <div className="flex h-max w-full flex-col border-t border-t-slate-300 p-1">
        <Typography>Matrix.org</Typography>
      </div>
    ),
  },
}

export default meta
