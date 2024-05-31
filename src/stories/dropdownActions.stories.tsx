import DropdownActions, {
  type DropdownActionsProps,
} from "@/components/DropdownActions"
import {type Meta, type StoryObj} from "@storybook/react"

import {IoAccessibility, IoAdd, IoFlame} from "react-icons/io5"

type Story = StoryObj<typeof DropdownActions>

const meta: Meta<typeof DropdownActions> = {
  component: DropdownActions,
}
const render = (args: DropdownActionsProps) => <DropdownActions {...args} />

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
