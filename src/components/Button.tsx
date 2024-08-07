import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum ButtonVariant {
  Primary,
  Secondary,
  TextLink,
}

export type ButtonProps = {
  onClick: () => void
  label: string
  isLoading?: boolean
  variant?: ButtonVariant
  isSmall?: boolean
  isDisabled?: boolean
  className?: string
}

const variantClass: {[key in ButtonVariant]: string} = {
  [ButtonVariant.Primary]:
    "border-green-600 bg-green-500 text-white hover:bg-green-400 hover:shadow",
  [ButtonVariant.Secondary]: "border-slate-300 bg-gray-100 hover:shadow",
  [ButtonVariant.TextLink]:
    "bg-none hover:text-green-800 hover:bg-green-100 border-none underline",
}

const Button: FC<ButtonProps> = ({
  label: text,
  onClick,
  isDisabled = false,
  isLoading = false,
  isSmall = false,
  variant = ButtonVariant.Secondary,
  className,
}) => {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center border font-medium outline-none duration-75 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50",
        isLoading ? "cursor-not-allowed" : "active:translate-y-[1px]",
        isSmall
          ? "max-h-6 rounded-md px-2 py-1 text-xs"
          : "rounded-md p-1 px-2 text-sm",
        variantClass[variant],
        className
      )}
      disabled={isDisabled}
      onClick={isLoading ? undefined : onClick}>
      {isLoading ? (
        <div
          className={twMerge(
            "size-4 animate-rotation rounded-full border-2",
            variant === ButtonVariant.Secondary
              ? "border-slate-500 border-t-gray-300"
              : "border-white border-t-borderLoading"
          )}
        />
      ) : (
        text
      )}
    </button>
  )
}

export default Button
