import {type FC} from "react"
import "../styles/Modal.sass"

export enum ModalPosition {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

export type ModalProps = {
  position?: ModalPosition
  dialogs: JSX.Element[]
}

const Modal: FC<ModalProps> = ({position, dialogs}) => {
  const MAX_DIALOGS = 5
  const dialogsToShow = [...dialogs].slice(0, MAX_DIALOGS).reverse()

  return (
    <div data-style={position} className="modal-overlay">
      {dialogsToShow.map((dialog, index) => (
        <div
          key={index}
          className="popups"
          style={{opacity: 1 - 0.2 * (dialogsToShow.length - 1 - index)}}>
          {dialog}
        </div>
      ))}
    </div>
  )
}

export default Modal
