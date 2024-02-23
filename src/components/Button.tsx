import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum ButtonVariant {
  Primary,
  Secondary,
  TextLink,
}

export enum ButtonSize {
  Small = "p-[5px] text-xs rounded-[5px] border-[1px] px-2",
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

const STYLES = {
  PrimaryPurple: "bg-purple-700 border-purple-900 text-white",
  PrimaryBlack: "bg-black border-none text-white",
  Secondary: "bg-purple-100 text-purple-800 border-none hover:bg-purple-200",
  TextLinkPurple:
    "bg-none text-purple-800 hover:bg-purple-100 border-none underline",
  TextLinkBlack: "bg-none text-black hover:bg-stone-100 border-none underline",
}

const buildStyle = (
  color: ButtonColor = ButtonColor.Purple,
  variant: ButtonVariant = ButtonVariant.Primary
): string => {
  switch (variant) {
    case ButtonVariant.Primary:
      return color === ButtonColor.Black
        ? STYLES.PrimaryBlack
        : STYLES.PrimaryPurple
    case ButtonVariant.Secondary:
      return STYLES.Secondary
    case ButtonVariant.TextLink:
      return color === ButtonColor.Black
        ? STYLES.TextLinkBlack
        : STYLES.TextLinkPurple
    default:
      return STYLES.PrimaryPurple
  }
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
  return (
    <button
      className={twMerge(
        "flex box-border active:translate-y-[1px] origin-center cursor-pointer items-center justify-center border-solid font-strong outline-none disabled:translate-y-[1px]",
        buildStyle(color, variant),
        size ?? "rounded-[10px] border-[2px] p-[10px]"
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
