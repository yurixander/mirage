import "../styles/Modal.sass"
import Button, {ButtonStyle} from "./Button"
import Label from "./Label"

export type ModalProps = {
  text: string,
  acceptText?: string,
  onAccept?: () => void,
  onCancel?: () => void,
}

export default function Modal(props: ModalProps) {
  return <div className="Modal">
    <div className="overlay">
      <div className="content">
        <Label center text="Confirm action" />
        <p>{props.text}</p>
        <Button
          style={ButtonStyle.Primary}
          text={props.acceptText || "Close"}
          onClick={props.onAccept || (() => { })}
        />
      </div>
    </div>
  </div>
}
