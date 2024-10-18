import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"
import {Button} from "@/components/ui/button"
import {
  Modal,
  ModalTrigger,
  ModalCancel,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalMoreInfo,
} from "@/components/ui/modal"

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {component: Modal}

const render = (): React.JSX.Element => (
  <div className="flex size-full items-center justify-center">
    <Modal>
      <ModalTrigger asChild>
        <Button>Open</Button>
      </ModalTrigger>

      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal title</ModalTitle>

          <ModalDescription>Modal subtitle goes here</ModalDescription>
        </ModalHeader>

        <ModalFooter>
          <ModalMoreInfo>Need help?</ModalMoreInfo>

          <ModalCancel>Cancel</ModalCancel>

          <ModalAction>Continue</ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </div>
)

export const Default: Story = {
  render,
  args: {},
}

export default meta
