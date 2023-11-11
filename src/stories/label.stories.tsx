import {Meta, StoryObj} from "@storybook/react"
import Label, {LabelProps} from "../components/Label"

type Story = StoryObj<typeof Label>

const meta: Meta<typeof Label> = {component: Label}

export const Default: Story = {
  render: (args: LabelProps) => <Label {...args} />,
  args: {
    text: "This is a label",
  }
}

export default meta
