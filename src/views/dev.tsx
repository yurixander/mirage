import React, {type FC} from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-center justify-center">
        {/* TODO: Use for alert dialog, prefer create a component for Modal with this. */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open</Button>
          </AlertDialogTrigger>

          <ModalContent>
            <ModalHeader>
              <ModalTitle>Modal title</ModalTitle>

              <ModalDescription>Modal subtitle goes here</ModalDescription>
            </ModalHeader>

            <ModalFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction>Continue</AlertDialogAction>
            </ModalFooter>
          </ModalContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default DevelopmentPreview
