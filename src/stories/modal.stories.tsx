import Modal, {type ModalProps} from "@/components/Modal"
import Typography from "@/components/Typography"
import {type Meta, type StoryObj} from "@storybook/react"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}

const render = (args: ModalProps) => <Modal {...args} />

export const Default: Story = {
  render,
  args: {
    title: "New Space",
    actionText: "Create Space",
    children: <Typography>Helooooo</Typography>,
    onAccept: () => {},
    onClose: () => {},
  },
}

export default meta
