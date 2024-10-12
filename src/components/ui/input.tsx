import * as React from "react"

import {cn} from "@/utils/utils"
import {IoSearch} from "react-icons/io5"
import useDebounced from "@/hooks/util/useDebounced"
import {type IconType} from "react-icons"
import useTooltip from "@/hooks/util/useTooltip"
import {IconButton} from "./button"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-7 w-full rounded-sm bg-gray-50 px-2.5 py-0.5 text-sm text-slate-500 shadow-sm outline-1 outline-offset-0 outline-slate-300 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-300 focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-400 dark:outline-neutral-700 dark:placeholder:text-neutral-500 sm:h-9 sm:rounded-lg sm:px-3 sm:py-1 sm:text-base",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export interface InputIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const InputIcon: React.FC<InputIconProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      "pointer-events-none absolute inset-x-0 left-1 h-auto w-max text-gray-300 dark:text-neutral-500 sm:left-1.5",
      className
    )}>
    {children}
  </div>
)

InputIcon.displayName = "InputIcon"

export type InputConstraint = {
  message: string
  pattern: RegExp
}

export interface InputIconActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  Icon: IconType
  onClick: () => void
  tooltip?: string
}

const InputIconAction: React.FC<InputIconActionProps> = ({
  Icon,
  onClick,
  tooltip,
  className,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      "absolute right-1 h-auto w-max text-gray-300 dark:text-neutral-500 sm:right-1.5",
      className
    )}>
    <IconButton
      tooltip={tooltip}
      onClick={onClick}
      className="hover:bg-transparent">
      <Icon />
    </IconButton>
  </div>
)

InputIconAction.displayName = "InputIconAction"

export type InputWithIconProps = {
  Icon: IconType
  action?: InputIconActionProps
  inputProps: InputProps
  onValueChange?: (value: string) => void
  ariaLabel?: string
  constraints?: InputConstraint[]
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  Icon,
  action,
  inputProps,
  onValueChange,
  ariaLabel,
  constraints,
}) => {
  const {renderRef, showTooltip} = useTooltip<HTMLInputElement>()
  const [value, setValue] = React.useState("")
  const [violatedConstraints, setViolatedConstraints] = React.useState<
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
    <InputRoot>
      <InputIcon>
        <Icon />
      </InputIcon>

      <Input
        ref={renderRef}
        className="px-7 sm:px-9"
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
        {...inputProps}
      />

      {action && <InputIconAction {...action} />}
      {violatedConstraints.map(violation => (
        // TODO: Fix this problem
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        <>{showTooltip(violation.message, true)}</>
      ))}
    </InputRoot>
  )
}

InputWithIcon.displayName = "InputWithIcon"

export interface InputRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const InputRoot: React.FC<InputRootProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("relative flex items-center", className)} {...props}>
    {children}
  </div>
)

InputRoot.displayName = "InputRoot"

export type SearchInputProps = {
  initialValue?: string
  hasIcon?: boolean
  searchDelay?: number
  className?: string
  placeholder?: string
  ariaLabel?: string
  onQueryDebounceChange: (query: string) => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      hasIcon = true,
      searchDelay = 500,
      placeholder = "Search...",
      onQueryDebounceChange,
      className,
      initialValue,
      ariaLabel,
    },
    ref
  ) => {
    const [query, setQuery] = React.useState(initialValue ?? "")
    const debouncedQuery = useDebounced(query, searchDelay)

    React.useEffect(() => {
      onQueryDebounceChange(debouncedQuery)
    }, [debouncedQuery, onQueryDebounceChange])

    const InputElement = (
      <Input
        type="search"
        aria-label={ariaLabel}
        ref={ref}
        className={cn("pl-7 sm:pl-9", className)}
        placeholder={placeholder}
        value={query}
        onChange={event => {
          setQuery(event.target.value)
        }}
      />
    )

    return hasIcon ? (
      <InputRoot className="w-full" aria-hidden>
        <InputIcon>
          <IoSearch aria-hidden className="size-4 sm:size-5" />
        </InputIcon>

        {InputElement}
      </InputRoot>
    ) : (
      InputElement
    )
  }
)

SearchInput.displayName = "SearchInput"

export {
  Input,
  InputIcon,
  InputRoot,
  SearchInput,
  InputIconAction,
  InputWithIcon,
}
