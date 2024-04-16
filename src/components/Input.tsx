import React from "react"
import {useState, type FC} from "react"
import IconButton from "./IconButton"
import Label from "./Label"
import {twMerge} from "tailwind-merge"
import {type IconType} from "react-icons"

export type InputConstraint = {
  message: string
  pattern: RegExp
}

export type InputAction = {
  tooltip: string
  onClick: () => void
  icon: IconType
}

export type InputProps = {
  isDisabled?: boolean
  label?: string
  className?: string
  placeholder: string
  constraints?: InputConstraint[]
  alwaysShowAllConstraints?: boolean
  onValueChange?: (value: string) => void
  initialValue?: string
  parentValue?: string
  Icon?: IconType
  actions?: InputAction[]
}

const urlPattern = new RegExp(
  // Protocol.
  "^(https?:\\/\\/)?" +
    // Domain name and extension.
    "([a-z\\d-]+\\.)+[a-z]{2,}|" +
    // Or IP (v4) address.
    "((\\d{1,3}\\.){3}\\d{1,3})" +
    // Port.
    "(:\\d+)?" +
    // Path.
    "(\\/[-\\w%.~+]*)*" +
    // Query string.
    "(\\?[;&\\w%.~+=-]*)?" +
    // Fragment locator.
    "(#[-\\w]*)?$",
  "i"
)

const userIdPattern = new RegExp(
  // `@` [username] `:` [domain]
  /^@[\w./=\-]+:[\d.a-z\-]+\.[a-z]{2,}$/i
)

const integerPattern = new RegExp(
  // Optional sign and digits.
  /^[+-]?\d+$/
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
  placeholder,
  constraints,
  alwaysShowAllConstraints,
  onValueChange,
  initialValue,
  parentValue,
  Icon,
  actions,
}) => {
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
    <div className={className?.trim()}>
      <div
        className="flex items-center rounded border border-neutral-300 bg-neutral-50"
        tabIndex={isDisabled ? undefined : 0}>
        {label !== undefined && <Label text={label} />}

        {Icon && <Icon className="ml-2 size-5 text-neutral-200" />}

        <input
          className="w-full rounded bg-neutral-50 text-sm"
          type="text"
          disabled={isDisabled}
          placeholder={placeholder}
          value={parentValue ?? value}
          onChange={handleChange}
        />

        {actions && (
          <div className="mr-1 flex fill-neutral-200">
            {actions?.map(action => (
              <IconButton
                key={action.tooltip}
                onClick={action.onClick}
                tooltip={action.tooltip}
                Icon={action.icon}
                isDisabled={violatedConstraints.length > 0}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-1 flex flex-row gap-1 pl-1">
        {violatedConstraints.map(constraint => (
          <span
            key={constraint.pattern.source}
            className={twMerge(
              "text-constraintSize flex",
              constraint.pattern.test(value) ? "text-green-500" : "text-red-500"
            )}>
            <div className="before:mr-[1ch] before:inline-block before:size-[1.2ch] before:rounded-[50%] before:bg-current before:shadow-constraint before:shadow-current" />
            {constraint.message}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Input
