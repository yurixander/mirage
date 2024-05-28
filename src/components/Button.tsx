import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum ButtonVariant {
  Primary,
  Secondary,
  TextLink,
}

export enum ButtonSize {
  Small,
}

export type ButtonProps = {
  onClick: () => void
  label: string
  isLoading?: boolean
  loadingText?: string
  variant?: ButtonVariant
  size?: ButtonSize
  isDisabled?: boolean
  className?: string
}

const Button: FC<ButtonProps> = ({
  label: text,
  isLoading,
  variant = ButtonVariant.Primary,
  onClick,
  isDisabled,
  size,
  className,
  loadingText,
}) => {
  const sizeClass =
    size === ButtonSize.Small
      ? "p-1 text-xs rounded px-2"
      : "p-2 min-w-32 px-4 text-sm rounded"

  const variantClass =
    variant === ButtonVariant.Primary
      ? "border border-green-700 bg-green-500 text-white hover:border-green-600 hover:bg-green-400 hover:shadow active:translate-y-1"
      : variant === ButtonVariant.Secondary
        ? "bg-green-200 text-green-700 hover:bg-green-100 hover:shadow"
        : variant === ButtonVariant.TextLink
          ? "bg-none hover:text-green-800 hover:bg-green-100 border-none underline"
          : ""

  return (
    <button
      className={twMerge(
        "box-border flex items-center justify-center outline-none duration-100 active:translate-y-[1px] disabled:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50",
        sizeClass,
        variantClass,
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
