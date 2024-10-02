import React, {type FC} from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {StaticAssetPath} from "@/utils/util"
import {ReactSVG} from "react-svg"
import {Button} from "@/components/ui/button"
import {
  ModalContent,
  ModalDescription,
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

            <div className="flex gap-1 overflow-hidden">
              <ReactSVG src={StaticAssetPath.DotGrid} />

              <ReactSVG src={StaticAssetPath.DotGrid} />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </ModalContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default DevelopmentPreview
