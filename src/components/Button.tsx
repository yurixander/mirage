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
      : "rounded-xl border-[2px] p-3"

  const variantClass =
    variant === ButtonVariant.Primary
      ? color === ButtonColor.Black
        ? "bg-black border-none text-white"
        : "bg-purple-700 border-purple-900 text-white"
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
        "font-strong box-border flex origin-center cursor-pointer items-center justify-center border-solid outline-none active:translate-y-[1px] disabled:translate-y-[1px]",
        sizeClass,
        variantClass,
        className
      )}
      disabled={isLoading ?? isDisabled}
      onClick={isDisabled ? undefined : onClick}
      tabIndex={isDisabled ? undefined : 0}>
      {text}
    </button>
  )
}

export default Button
