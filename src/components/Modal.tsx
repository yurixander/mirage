import React, {type FC} from "react"
import {createPortal} from "react-dom"
import {twMerge} from "tailwind-merge"

export enum ModalPosition {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

export type ModalProps = {
  children: React.JSX.Element
  isVisible: boolean
  position?: ModalPosition
}

const Modal: FC<ModalProps> = ({position, children, isVisible}) => {
  const popupPositionClass =
    position === ModalPosition.Left
      ? "items-center justify-start"
      : position === ModalPosition.Right
        ? "items-center justify-end"
        : position === ModalPosition.Top
          ? "items-start justify-center"
          : position === ModalPosition.Bottom
            ? "items-end justify-center"
            : "items-center justify-center"

  return (
    isVisible &&
    createPortal(
      <div
        className={twMerge(
          "fixed inset-0 flex size-full w-screen flex-col bg-modalOverlay",
          popupPositionClass
        )}>
        {children}
      </div>,
      document.body
    )
  )
}

export default Modal
