import {type Meta, type StoryObj} from "@storybook/react"
import CallModal, {
  VariantCall,
  type CallModalProps,
} from "../components/CallModal"

type Story = StoryObj<typeof CallModal>

const meta: Meta<typeof CallModal> = {
  component: CallModal,
}
const render = (args: CallModalProps) => <CallModal {...args} />

export const Default: Story = {
  render,
  args: {
    name: "Jose Luis Reyes",
    variant: VariantCall.CallInProgress,
  },
}

export default meta
