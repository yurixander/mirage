import {Meta, StoryObj} from "@storybook/react"
import Modal, {ModalProps} from "../components/Modal"
import Button from "../components/Button"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}
const render = (args: ModalProps) => <Modal {...args} />

export const WithTwoDialogs: Story = {
  render,
  args: {
    dialogs: [
      <div className="TestPopup">
        <Button onClick={() => { }} text={"showPopup2"} />
      </div>,
      <div className="TestPopup">
        <Button onClick={() => { }} text={"showPopup2"} />
        <Button onClick={() => { }} text={"close"} />
      </div>
    ]
  }
}

export default meta
