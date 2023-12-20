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

const Modal = (props: ModalProps) => {
  const MAX_DIALOGS = 5
  const dialogsToShow = [...props.dialogs].slice(0, MAX_DIALOGS).reverse()

  return (
    <div data-style={props.position} className="modal-overlay">
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
