import useActiveModalStore, {
  ModalPosition,
  Modals,
} from "@/hooks/util/useActiveModal"
import {assert} from "@/utils/util"
import type React from "react"
import type {FC} from "react"
import {createPortal} from "react-dom"
import {twMerge} from "tailwind-merge"
import CreateRoomModal from "./CreateRoomModal"
import CreateSpaceModal from "./CreateSpaceModal"

const modalComponents: {[key in Modals]: React.JSX.Element} = {
  [Modals.CreateRoom]: <CreateRoomModal />,
  [Modals.CreateSpace]: <CreateSpaceModal />,
}

const popupPositionClass: {[key in ModalPosition]: string} = {
  [ModalPosition.Left]: "items-center justify-start",
  [ModalPosition.Right]: "items-center justify-end",
  [ModalPosition.Top]: "items-start justify-center",
  [ModalPosition.Bottom]: "items-end justify-center",
  [ModalPosition.Center]: "items-center justify-center",
}

const ModalHandler: FC = () => {
  const {modalActive, position, renderLocation} = useActiveModalStore()

  const targetElement =
    renderLocation === null
      ? document.body
      : document.querySelector(`#${renderLocation}`)

  assert(targetElement !== null, "The render location does not exist")

  return (
    modalActive !== null &&
    createPortal(
      <div
        className={twMerge(
          "fixed inset-0 z-50 flex size-full w-screen flex-col bg-modalOverlay",
          popupPositionClass[position]
        )}>
        {modalComponents[modalActive]}
      </div>,
      document.body
    )
  )
}

export default ModalHandler
