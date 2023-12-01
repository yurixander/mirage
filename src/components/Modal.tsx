import '../styles/Modal.sass'

export enum ModalPosition {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom"
}

export type ModalProps = {
  position?: ModalPosition,
  dialogs: JSX.Element[]
}

const Modal = (props: ModalProps) => {
  const dialogsToShow = [...props.dialogs].slice(0, 5).reverse()
  const numDialogs = dialogsToShow.length

  return (
    <div data-style={props.position} className="modal-overlay">
      {dialogsToShow.map((dialog, index) => (
        <div
          className="popups"
          style={{opacity: 1 - 0.2 * (numDialogs - 1 - index)}}
        >
          {dialog}
        </div>
      ))}
    </div >
  )
}

export default Modal
