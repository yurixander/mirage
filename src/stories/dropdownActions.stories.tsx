import DropdownActions, {
  type DropdownActionsProps,
} from "@/components/DropdownActions"
import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"

import {IoAccessibility, IoAdd, IoFlame} from "react-icons/io5"

type Story = StoryObj<typeof DropdownActions>

const meta: Meta<typeof DropdownActions> = {
  component: DropdownActions,
}
const render = (args: DropdownActionsProps): React.JSX.Element => (
  <DropdownActions {...args} />
)

export const Default: Story = {
  render,
  args: {
    onOptionSelected: () => {},
    initiallyOption: {
      text: "Option 1",
      Icon: IoFlame,
    },
    options: [
      {
        text: "Option 1",
        Icon: IoFlame,
      },
      {
        text: "Option 2",
        Icon: IoAdd,
      },
      {
        text: "Option 3",
        Icon: IoAccessibility,
      },
    ],
  },
}

export default meta
