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
      <div className="TestPopup" key={0}>
        <Button onClick={() => {}} label={"showPopup2"} />
      </div>,
      <div className="TestPopup" key={1}>
        <Button onClick={() => {}} label={"showPopup2"} />

        <Button onClick={() => {}} label={"close"} />
      </div>,
    ],
  },
}

// TODO: Fix problem with width overflow
export const WelcomePopup: Story = {
  render,
  args: {
    dialogs: [
      <div
        className="flex max-w-popupSize flex-col rounded-10 bg-white"
        key={0}>
        <div className="relative flex flex-col items-center p-x1">
          <h3 className="bg-rainbow bg-clip-text text-center text-small text-transparent">
            Hey you!
          </h3>

          <h1 className="bg-rainbow bg-clip-text text-center text-transparent">
            You&apos;re beautiful.
          </h1>

          <Stars className="absolute right-0 -translate-y-1/2 translate-x-3/4" />
        </div>

        <div className="flex grow flex-col gap-x1 p-x1 text-medium leading-160">
          <span className="leading-160">
            <b>Did you know that?</b> You&apos;re a beautiful person, with a
            charming personality. My grandmother always used to say—”Cows are
            beautiful cloven-hooved herbivores, and so should you!”
          </span>

          <span>I hope that resonates with you as much as it did with me.</span>

          <div className="flex grow items-end justify-center gap-5px">
            <DotGrid />
          </div>
        </div>

        <div className="flex flex-row justify-end rounded-b-10 border-1 border-solid border-border bg-cardActionsBg p-10px">
          <Button
            label="Got it, thanks ⟶"
            variant={ButtonVariant.Default}
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
