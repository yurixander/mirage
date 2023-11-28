import '../styles/Modal.sass'

export enum ModalPosition {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom"
}

export type ModalProps = {
  position?: ModalPosition,
  isOpen: () => void,
  onClose: () => void,
  dialogs: JSX.Element[]
}

const Modal = (props: ModalProps) => {
  if (!props.isOpen) return null

  return (
    <div data-style={props.position} className="modal-overlay">
      {props.dialogs}
    </div>
  )
}

export default Modal
