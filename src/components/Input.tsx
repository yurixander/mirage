import React from "react"
import {useState, type FC} from "react"
import Label from "./Label"
import {twMerge} from "tailwind-merge"
import {type IconType} from "react-icons"
import {t} from "@/utils/lang"
import {LangKey} from "@/lang/allKeys"
import {IconButton} from "./ui/button"

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
  onValueChange?: (value: string) => void
  initialValue?: string
  parentValue?: string
  Icon?: IconType
  actions?: InputAction[]
  type?: React.HTMLInputTypeAttribute
  isSmall?: boolean
}

const urlPattern = new RegExp(
  // Protocol.
  String.raw`^(https?:\/\/)?` +
    // Domain name and extension.
    String.raw`([a-z\d-]+\.)+[a-z]{2,}|` +
    // Or IP (v4) address.
    String.raw`((\d{1,3}\.){3}\d{1,3})` +
    // Port.
    String.raw`(:\d+)?` +
    // Path.
    String.raw`(\/[-\w%.~+]*)*` +
    // Query string.
    String.raw`(\?[;&\w%.~+=-]*)?` +
    // Fragment locator.
    String.raw`(#[-\w]*)?$`,
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
  message: t(LangKey.MustBeAValidURL),
  pattern: urlPattern,
}

export const nonEmptyConstraint: InputConstraint = {
  message: t(LangKey.MustNotBeEmpty),
  pattern: /.+/,
}

export const userIdConstraint: InputConstraint = {
  message: t(LangKey.MustBeAValidUserID),
  pattern: userIdPattern,
}

export const integerConstraint: InputConstraint = {
  message: t(LangKey.MustBeAnInteger),
  pattern: integerPattern,
}

const Input: FC<InputProps> = ({
  isDisabled,
  label,
  className,
  placeholder,
  constraints,
  onValueChange,
  initialValue,
  parentValue,
  Icon,
  actions,
  type,
  isSmall = false,
}) => {
  const [value, setValue] = useState(initialValue ?? "")

  const [violatedConstraints, setViolatedConstraints] = useState<
    InputConstraint[]
  >([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
    <div className={className}>
      <div
        className="flex items-center rounded border border-neutral-300 bg-neutral-50"
        tabIndex={isDisabled ? undefined : 0}>
        {label !== undefined && <Label text={label} />}

        {Icon && (
          <Icon
            className={twMerge(
              "text-neutral-200",
              isSmall ? "ml-1 size-4" : "ml-2 size-5"
            )}
          />
        )}

        <input
          className={twMerge(
            "w-full rounded bg-neutral-50",
            isSmall ? "p-1 text-sm" : "p-2"
          )}
          type={type ?? "text"}
          disabled={isDisabled}
          placeholder={placeholder}
          value={parentValue ?? value}
          onChange={handleChange}
        />

        {actions && (
          <div className="mr-1 flex fill-neutral-200">
            {actions.map(action => (
              <IconButton
                key={action.tooltip}
                onClick={action.onClick}
                tooltip={action.tooltip}
                disabled={violatedConstraints.length > 0}>
                <action.icon />
              </IconButton>
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
