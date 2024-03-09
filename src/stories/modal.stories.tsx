import {type Meta, type StoryObj} from "@storybook/react"
import Button from "../components/Button"
import Modal, {type ModalProps as ModalProperties} from "../components/Modal"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}
const render = (arguments_: ModalProperties) => <Modal {...arguments_} />

export const WithTwoDialogs: Story = {
  render,
  args: {
    dialogs: [
      <div key={0}>
        <Button onClick={() => {}} label="showPopup2" />
      </div>,
      <div key={1}>
        <Button onClick={() => {}} label="showPopup2" />

        <Button onClick={() => {}} label="close" />
      </div>,
    ],
  },
}

export default meta
