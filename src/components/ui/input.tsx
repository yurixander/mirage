import * as React from "react"

import {cn} from "@/utils/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-7 w-full rounded border border-input bg-gray-50 px-2.5 py-0.5 text-sm text-slate-500 shadow-sm outline-1 outline-slate-300 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-400 focus-visible:outline-1 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:rounded-sm sm:px-3 sm:py-1 sm:text-base sm:outline-2 sm:focus-visible:outline-2",
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
      "pointer-events-none absolute inset-x-0 left-1 h-auto w-max text-gray-300 sm:left-1.5",
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

export {Input, InputIcon, InputRoot}
