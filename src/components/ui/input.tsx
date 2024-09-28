import * as React from "react"

import {cn} from "@/utils/utils"
import {IoSearch} from "react-icons/io5"
import useDebounced from "@/hooks/util/useDebounced"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-7 w-full rounded border border-input bg-gray-50 px-2.5 py-0.5 text-sm text-slate-500 shadow-sm outline-1 outline-offset-0 outline-slate-300 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-400 focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-400 dark:outline-neutral-700 dark:placeholder:text-neutral-500 sm:h-9 sm:rounded-sm sm:px-3 sm:py-1 sm:text-base sm:outline-2 sm:focus-visible:outline-2",
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

export {Input, InputIcon, InputRoot, SearchInput}
