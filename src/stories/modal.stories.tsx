import {Meta, StoryObj} from "@storybook/react"
import Modal, {ModalProps} from "../components/Modal"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}

export const Confirm: Story = {
  name: "Confirm",
  render: (args: ModalProps) => <Modal {...args} />,
  args: {
    text: "Are you sure you want to do this?",
    acceptText: "Confirm"
  }
}

export default meta
