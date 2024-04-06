import {assert} from "@/utils/util"
import type React from "react";
import {type FC} from "react"
import {createPortal} from "react-dom"
import {twMerge} from "tailwind-merge"

export enum ModalRenderLocation {
  ChatContainer = "chat-container",
}

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
  renderLocation?: ModalRenderLocation
}

const getPopupPositionClassName = (position?: ModalPosition): string => {
  switch (position) {
    case ModalPosition.Left: {
      return "items-center justify-start"
    }
    case ModalPosition.Right: {
      return "items-center justify-end"
    }
    case ModalPosition.Top: {
      return "items-start justify-center"
    }
    case ModalPosition.Bottom: {
      return "items-end justify-center"
    }
    case undefined: {
      return "items-center justify-center"
    }
  }
}

const Modal: FC<ModalProps> = ({
  position,
  children,
  isVisible,
  renderLocation,
}) => {
  const targetElement =
    renderLocation === undefined
      ? document.body
      : document.querySelector(renderLocation)

  assert(targetElement !== null, "The render location does not exist")

  return (
    isVisible &&
    createPortal(
      <div
        className={twMerge(
          "fixed inset-0 flex size-full w-screen flex-col bg-modalOverlay",
          getPopupPositionClassName(position)
        )}>
        {children}
      </div>,
      targetElement
    )
  )
}

export default Modal
