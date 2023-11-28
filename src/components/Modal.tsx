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
  children: JSX.Element
}

const Modal = (props: ModalProps) => {
  if (!props.isOpen) return null

  return (
    <div data-style={props.position} className="modal-overlay">
      <div className="modal-window">
        {props.children}
      </div>
    </div>
  )
}

export default Modal
