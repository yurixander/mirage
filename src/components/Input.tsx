/* eslint-disable tailwindcss/enforces-shorthand */
import {type IconProp} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useState, type FC} from "react"
import IconButton from "./IconButton"
import Label from "./Label"
import {twMerge} from "tailwind-merge"

export type InputConstraint = {
  message: string
  pattern: RegExp
}

export type InputAction = {
  tooltip: string
  onClick: () => void
  icon: IconProp
}

export type InputProps = {
  isDisabled?: boolean
  label?: string
  className?: string
  autoFocus?: boolean
  placeholder: string
  constraints?: InputConstraint[]
  alwaysShowAllConstraints?: boolean
  onValueChange?: (value: string) => void
  initialValue?: string
  parentValue?: string
  icon?: IconProp
  actions?: InputAction[]
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
    "(\\#[-a-zA-Z\\d_]*)?$",
  "i"
)

const userIdPattern = new RegExp(
  // `@` [username] `:` [domain]
  /^@[a-zA-Z_\-=\.\/0-9]+:[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/
)

const integerPattern = new RegExp(
  // Optional sign and digits.
  /^[-+]?\d+$/
)

export const urlConstraint: InputConstraint = {
  message: "Must be a valid URL.",
  pattern: urlPattern,
}

export const nonEmptyConstraint: InputConstraint = {
  message: "Must not be empty.",
  pattern: /.+/,
}

export const userIdConstraint: InputConstraint = {
  message: "Must be a valid user ID.",
  pattern: userIdPattern,
}

export const integerConstraint: InputConstraint = {
  message: "Must be an integer.",
  pattern: integerPattern,
}

const Input: FC<InputProps> = ({
  isDisabled,
  label,
  className,
  autoFocus,
  placeholder,
  constraints,
  alwaysShowAllConstraints,
  onValueChange,
  initialValue,
  parentValue,
  icon,
  actions,
}) => {
  const isDisabledClass = isDisabled ? " disabled" : ""
  const [value, setValue] = useState(initialValue ?? "")

  const [violatedConstraints, setViolatedConstraints] = useState<
    InputConstraint[]
  >([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setValue(value)

    if (constraints) {
      const violations = constraints.filter(
        constraint => !constraint.pattern.test(value)
      )

      setViolatedConstraints(violations)
    }

    if (onValueChange !== undefined) {
      onValueChange(value)
    }
  }

  return (
    <div className={(className ?? "" + isDisabledClass).trim()}>
      <div
        className="flex items-center rounded-10 border-1 border-solid border-border focus-visible:rounded-5 focus-visible:outline-2 focus-visible:outline-outlineTab"
        tabIndex={isDisabled ? undefined : 0}>
        {label !== undefined && <Label text={label} />}
        {icon && (
          <div className="ml-10px h-icon w-icon text-contrastIcon">
            <FontAwesomeIcon icon={icon} />
          </div>
        )}

        <input
          className="w-full border-none"
          type="text"
          disabled={isDisabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={parentValue ?? value}
          onChange={handleChange}></input>

        {actions && (
          <div className="mr-5px flex fill-contrastIcon">
            {actions?.map((action, index) => (
              <IconButton
                key={index}
                onClick={action.onClick}
                tooltip={action.tooltip}
                tooltipPlacement={"auto"}
                icon={action.icon}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-5px flex flex-row gap-5px pl-5px">
        {violatedConstraints.map(constraint => (
          <span
            key={constraint.message}
            className={twMerge(
              "text-constraintSize flex",
              constraint.pattern.test(value) ? "text-green" : "text-red"
            )}>
            <div className="before:mr-1ch before:inline-block before:h-constraintSize before:w-constraintSize before:rounded-50 before:bg-current before:shadow-constraint before:shadow-current"></div>
            {constraint.message}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Input
