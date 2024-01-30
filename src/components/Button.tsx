import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum ButtonVariant {
  Primary = "bg-purple-800 border-purple-900 text-white",
  Secondary = "bg-purple-100 text-purple-800 border-none hover:bg-purple-200",
  TextLink = "bg-none text-purple-800 hover:bg-purple-100 border-none underline",
}

export enum ButtonSize {
  Small = "p-5px text-xs rounded-5 border-1",
}

export type ButtonProps = {
  autoFocus?: boolean
  onClick: () => void
  label: string
  isLoading?: boolean
  loadingText?: string
  variant?: ButtonVariant
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
  size,
}) => {
  return (
    <button
      className={twMerge(
        "flex box-border active:translate-y-1px origin-center cursor-pointer items-center justify-center border-solid font-strong outline-none disabled:translate-y-1px",
        variant ?? "bg-purple-800 border-purple-900 text-white",
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
