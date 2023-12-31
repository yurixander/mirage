import {type Meta, type StoryObj} from "@storybook/react"
import Modal, {type ModalProps} from "../components/Modal"
import Button, {ButtonStyle} from "../components/Button"
import {ReactComponent as Stars} from "../../public/icons/stars.svg"
import {ReactComponent as DotGrid} from "../../public/icons/dot-grid.svg"
import "../styles/WelcomePopup.sass"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}
const render = (args: ModalProps) => <Modal {...args} />

export const WithTwoDialogs: Story = {
  render,
  args: {
    dialogs: [
      <div className="TestPopup" key={0}>
        <Button onClick={() => {}} text={"showPopup2"} />
      </div>,
      <div className="TestPopup" key={1}>
        <Button onClick={() => {}} text={"showPopup2"} />
        <Button onClick={() => {}} text={"close"} />
      </div>,
    ],
  },
}

export const WelcomePopup: Story = {
  render,
  args: {
    dialogs: [
      <div className="WelcomePopup" key={0}>
        <div className="header">
          <h3>Hey you!</h3>
          <h1>You’re beautiful.</h1>
          <Stars className="stars" />
        </div>
        <div className="body">
          <span className="text">
            <b>Did you know that?</b> You’re a beautiful person, with a charming
            personality. My grandmother always used to say—”Cows are beautiful
            cloven-hooved herbivores, and so should you!”
          </span>
          <span>I hope that resonates with you as much as it did with me.</span>
          <div className="dot-grid">
            <DotGrid />
          </div>
        </div>
        <div className="actions">
          <Button
            text="Got it, thanks ⟶"
            style={ButtonStyle.Default}
            onClick={() => {
              /* TODO: Handle click on View messages button. */
            }}
          />
        </div>
      </div>,
    ],
  },
}

export default meta
