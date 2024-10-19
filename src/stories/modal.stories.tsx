import {Button} from "@/components/ui/button"
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalMoreInfo,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import type {Meta, StoryObj} from "@storybook/react"
import type React from "react"

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
