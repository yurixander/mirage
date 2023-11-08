import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons"
import "../styles/Modal.sass"
import Button, {ButtonType} from "./Button"
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
        {/* TODO: icon={faQuestionCircle} */}
        <Label center text="Confirm action" />
        <p>{props.text}</p>
        <Button
          type={ButtonType.Primary}
          text={props.acceptText || "Close"}
          onClick={props.onAccept || (() => { })}
        />
      </div>
    </div>
  </div>
}
