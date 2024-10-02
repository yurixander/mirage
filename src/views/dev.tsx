import {type FC} from "react"
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

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center">
        <Modal>
          <ModalTrigger asChild>
            <Button variant="default">Open</Button>
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
    </>
  )
}

export default DevelopmentPreview
