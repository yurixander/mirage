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
  isLoading = false,
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

  const variantClass = isDisabled
    ? "border disabled:border-borderButtonDisabled disabled:bg-backgroundButtonDisabled text-white"
    : variant === ButtonVariant.Primary
      ? "border border-green-700 bg-green-500 text-white duration-200 hover:border-green-600 hover:bg-green-400 hover:shadow active:translate-y-1"
      : isLoading
        ? "border border-green-600 bg-green-500 text-white"
        : variant === ButtonVariant.Secondary
          ? "bg-green-200 text-green-700 duration-200 hover:bg-green-100 hover:shadow active:translate-y-1"
          : variant === ButtonVariant.TextLink
            ? "bg-none hover:text-green-800 hover:bg-green-100 border-none underline duration-200 active:translate-y-1"
            : ""
  return (
    <button
      type="button"
      className={twMerge(
        "flex items-center justify-center",
        variantClass,
        sizeClass,
        className
      )}
      disabled={isLoading || isDisabled}
      onClick={onClick}>
      {isLoading ? <Loading textLoading={loadingText ?? "Loading..."} /> : text}
    </button>
  )
}

export default Button

type LoadingProps = {
  textLoading: string
}
const Loading: FC<LoadingProps> = ({textLoading}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="size-4 animate-rotation rounded-full border-2 border-white border-t-borderLoading" />
      <span>{textLoading}</span>
    </div>
  )
}
