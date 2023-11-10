import {reflectInputValue} from "../util"
import Button from "./Button"

type Props = {
  ref?: React.LegacyRef<HTMLInputElement>,
  value: string,
  setValue: (value: string) => void,
  placeholder: string,
  sendButtonText: string,
  sendMessage: () => void,
}

export default function ChatControls(props: Props) {
  return <div className="controls">
    <input
      ref={props.ref}
      autoFocus
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={reflectInputValue(props.setValue)}
      onKeyUp={(e) => {if (e.key === "Enter") props.sendMessage()}} />
    <Button text={props.sendButtonText} onClick={props.sendMessage} />
  </div>
}
