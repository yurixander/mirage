import type {Meta, StoryObj} from "@storybook/react"
import Label, {type LabelProps as LabelProperties} from "../components/Label"

type Story = StoryObj<typeof Label>

const meta: Meta<typeof Label> = {component: Label}

export const Default: Story = {
  render: (arguments_: LabelProperties) => <Label {...arguments_} />,
  args: {
    text: "This is a label",
  },
}

export default meta
