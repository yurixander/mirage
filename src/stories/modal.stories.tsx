import {type Meta, type StoryObj} from "@storybook/react"
import {ReactComponent as DotGrid} from "../../public/icons/dot-grid.svg"
import {ReactComponent as Stars} from "../../public/icons/stars.svg"
import Button, {ButtonVariant} from "../components/Button"
import Modal, {type ModalProps} from "../components/Modal"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}
const render = (args: ModalProps) => <Modal {...args} />

export const WithTwoDialogs: Story = {
  render,
  args: {
    dialogs: [
      <div key={0}>
        <Button onClick={() => {}} label={"showPopup2"} />
      </div>,
      <div key={1}>
        <Button onClick={() => {}} label={"showPopup2"} />

        <Button onClick={() => {}} label={"close"} />
      </div>,
    ],
  },
}

export default meta
