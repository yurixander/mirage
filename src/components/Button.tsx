import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum ButtonVariant {
  Primary,
  Secondary,
  TextLink,
}

export enum ButtonSize {
  Small = "p-5px text-xs rounded-5 border-1 px-2",
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
  PRIMARY_PURPLE: "bg-purple-700 border-purple-900 text-white",
  PRIMARY_BLACK: "bg-black border-none text-white",
  SECONDARY: "bg-purple-100 text-purple-800 border-none hover:bg-purple-200",
  TEXT_LINK:
    "bg-none text-purple-800 hover:bg-purple-100 border-none underline",
}

const buildStyle = (
  color: ButtonColor = ButtonColor.Purple,
  variant: ButtonVariant = ButtonVariant.Primary
): string => {
  switch (variant) {
    case ButtonVariant.Primary:
      return color === ButtonColor.Black
        ? STYLES.PRIMARY_BLACK
        : STYLES.PRIMARY_PURPLE
    case ButtonVariant.Secondary:
      return STYLES.SECONDARY
    case ButtonVariant.TextLink:
      return STYLES.TEXT_LINK
    default:
      return STYLES.PRIMARY_PURPLE
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
        "flex box-border active:translate-y-1px origin-center cursor-pointer items-center justify-center border-solid font-strong outline-none disabled:translate-y-1px",
        buildStyle(color, variant),
        size ?? "rounded-10 border-2 p-10px"
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
