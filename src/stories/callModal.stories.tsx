import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import CallModal, {
  VariantCall,
  type CallModalProps,
} from "../components/CallModal"

type Story = StoryObj<typeof CallModal>

const meta: Meta<typeof CallModal> = {
  component: CallModal,
}

const render = (args: CallModalProps): React.JSX.Element => (
  <CallModal {...args} />
)

export const Default: Story = {
  render,
  args: {
    name: "Jose Luis Reyes",
    variant: VariantCall.IncomingCall,
  },
}

export default meta
