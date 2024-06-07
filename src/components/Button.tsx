import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import React from "react"

export enum ButtonVariant {
  Primary,
  Secondary,
  TextLink,
}

export type ButtonProps = {
  onClick: () => void
  label: string
  isLoading?: boolean
  loadingText?: string
  variant?: ButtonVariant
  isSmall?: boolean
  isDisabled?: boolean
  className?: string
}

const variantClass: {[key in ButtonVariant]: string} = {
  [ButtonVariant.Primary]:
    "border border-green-700 bg-green-500 text-white hover:border-green-600 hover:bg-green-400 hover:shadow active:translate-y-1",
  [ButtonVariant.Secondary]: "border-slate-300 bg-gray-100 hover:shadow",
  [ButtonVariant.TextLink]:
    "bg-none hover:text-green-800 hover:bg-green-100 border-none underline",
}

const Button: FC<ButtonProps> = ({
  label: text,
  isLoading,
  variant = ButtonVariant.Primary,
  onClick,
  isDisabled,
  isSmall = false,
  className,
  loadingText,
}) => {
  return (
    <button
      className={twMerge(
        "box-border flex items-center justify-center border font-medium outline-none duration-100 active:translate-y-[1px] disabled:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50",
        variantClass[variant],
        isSmall
          ? "rounded px-2 py-1 text-xs"
          : "min-w-32 rounded-md px-2 py-1.5 text-sm",
        className
      )}
      disabled={isLoading === true || isDisabled === true}
      onClick={onClick}>
      {isLoading ? <Loading text={loadingText ?? "Loading..."} /> : text}
    </button>
  )
}

const Loading: FC<{text: string}> = ({text}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="size-4 animate-rotation rounded-full border-2 border-white border-t-borderLoading" />
      <span>{text}</span>
    </div>
  )
}

export default Button
