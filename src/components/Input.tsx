import "../styles/Input.sass"
import {useState} from "react"
import Label from "./Label"

export type InputConstraint = {
  message: string
  pattern: RegExp
}

type Props = {
  isDisabled?: boolean
  label?: string
  className?: string
  autoFocus?: boolean
  placeholder: string
  constraints?: InputConstraint[]
  alwaysShowAllConstraints?: boolean
  onChange?: (value: string) => void
  value?: string
}

const urlPattern = new RegExp(
  // Protocol.
  "^(https?:\\/\\/)?" +
  // Domain name and extension.
  "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
  // Or IP (v4) address.
  "((\\d{1,3}\\.){3}\\d{1,3}))" +
  // Port.
  "(\\:\\d+)?" +
  // Path.
  "(\\/[-a-zA-Z\\d%_.~+]*)*" +
  // Query string.
  "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" +
  // Fragment locator.
  "(\\#[-a-zA-Z\\d_]*)?$", "i"
)

export const urlConstraint: InputConstraint = {
  message: "Must be a valid URL.",
  pattern: urlPattern,
}

export default function Input(props: Props) {
  // TODO: Handle `alwaysShowAllConstraints` option.

  const [value, setValue] = useState(props.value || "")
  const [violatedConstraints, setViolatedConstraints] = useState<InputConstraint[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setValue(value)

    if (props.constraints) {
      const violations = props.constraints.filter(constraint => !constraint.pattern.test(value))

      setViolatedConstraints(violations)
    }
  }

  return (
    <div className={`Input --flex -vertical ${props.className || ""}`.trim()}>
      {props.label && <Label text={props.label} />}
      <input
        type="text"
        disabled={props.isDisabled}
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}
        value={value}
        onChange={handleInputChange}
      />
      <div className="constraints --flex -vertical -gap-half">
        {violatedConstraints.map(constraint => (
          <span
            key={constraint.message}
            className="constraint"
            data-is-met={constraint.pattern.test(value)}>
            {constraint.message}
          </span>
        ))}
      </div>
    </div>
  )
}
