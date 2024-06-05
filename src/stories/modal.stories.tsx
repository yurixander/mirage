import {type Meta, type StoryObj} from "@storybook/react"
import Button from "../components/Button"
import Modal, {
  type ModalProps as ModalProperties,
} from "../components/ModalHandler"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}
const render = (arguments_: ModalProperties) => <Modal {...arguments_} />

export const WithTwoDialogs: Story = {
  render,
  args: {
    children: (
      <div key={0}>
        <Button onClick={() => {}} label="showPopup2" />
      </div>
    ),
    isVisible: true,
  },
}

export default meta
