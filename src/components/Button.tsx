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

export enum ButtonColor {
  Purple,
  Black,
}

export type ButtonProps = {
  autoFocus?: boolean
  onClick: () => void
  label: string
  isLoading?: boolean
  loadingText?: string
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  isDisabled?: boolean
}

const Button: FC<ButtonProps> = ({
  autoFocus,
  onClick,
  label: text,
  isLoading,
  isDisabled,
  variant,
  color,
  size,
}) => {
  const sizeClass =
    size === ButtonSize.Small
      ? "p-[5px] text-xs rounded-[5px] border-[1px] px-2"
      : "rounded-[10px] border-[2px] p-[10px]"

  const variantClass =
    variant === ButtonVariant.Primary
      ? (color === ButtonColor.Black
        ? "bg-black border-none text-white"
        : "bg-purple-700 border-purple-900 text-white")
      : variant === ButtonVariant.Secondary
        ? "bg-purple-100 text-purple-800 border-none hover:bg-purple-200"
        : variant === ButtonVariant.TextLink
          ? color === ButtonColor.Black
            ? "bg-none text-black hover:bg-stone-100 border-none underline"
            : "bg-none text-purple-800 hover:bg-purple-100 border-none underline"
          : "bg-purple-700 border-purple-900 text-white"

  return (
    <button
      className={twMerge(
        "flex box-border active:translate-y-[1px] origin-center cursor-pointer items-center justify-center border-solid font-strong outline-none disabled:translate-y-[1px]",
        sizeClass,
        variantClass
      )}
      disabled={isLoading ?? isDisabled}
      autoFocus={autoFocus}
      onClick={isDisabled ? undefined : onClick}
      tabIndex={isDisabled ? undefined : 0}>
      {text}
    </button>
  )
}

export default Button
