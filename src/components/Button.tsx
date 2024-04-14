import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum ButtonVariant {
  Primary,
  Secondary,
  TextLink,
  Loading,
}

export enum ButtonSize {
  Small,
}

export enum ButtonColor {
  Purple,
  Black,
}

export type ButtonProps = {
  onClick: () => void
  label: string
  isLoading?: boolean
  loadingText?: string
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  isDisabled?: boolean
  className?: string
}

const Button: FC<ButtonProps> = ({
  onClick,
  label: text,
  isLoading,
  isDisabled,
  variant = ButtonVariant.Primary,
  color,
  size,
  className,
}) => {
  // TODO: Add outline variant.

  const sizeClass =
    size === ButtonSize.Small
      ? "p-1 text-xs rounded-md px-2"
      : "h-8 min-w-32 px-4 text-sm rounded"

  const variantClass = isDisabled
    ? "border disabled:border-[#15803D] disabled:bg-[#22C55E] text-white"
    : variant === ButtonVariant.Primary
      ? "border border-green-700 bg-green-500 text-white duration-200 hover:border-green-600 hover:bg-green-400 hover:shadow active:translate-y-1"
      : variant === ButtonVariant.Loading
        ? "border border-green-600 bg-green-500 text-white"
        : variant === ButtonVariant.Secondary
          ? "bg-green-200 text-green-700 duration-200 hover:bg-green-100 hover:shadow active:translate-y-1"
          : variant === ButtonVariant.TextLink
            ? "bg-none hover:text-purple-800 hover:bg-purple-100 border-none underline duration-200 active:translate-y-1 "
            : ""
  return (
    <button
      type="button"
      className={twMerge(
        "flex items-center justify-center ",
        variantClass,
        sizeClass,
        className
      )}
      disabled={variant === ButtonVariant.Loading || isDisabled}
      onClick={onClick}>
      {isLoading ? <Loading /> : text}
    </button>
  )
}

export default Button

const Loading: FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="size-4 animate-rotation rounded-full border-2 border-white border-t-[rgba(255,255,255,0.5)]" />
      <span>Loadin...</span>
    </div>
  )
}
