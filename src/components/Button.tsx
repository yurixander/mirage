import Loader from "@/components/Loader"
import "@/styles/Button.sass"
import {type FC} from "react"

export enum ButtonVariant {
  Primary = "primary",
  Green = "green",
  TextLink = "text-link",
  Default = "default",
}

export type ButtonProps = {
  className?: string
  autoFocus?: boolean
  onClick: () => void
  label: string
  isLoading?: boolean
  loadingText?: string
  variant?: ButtonVariant
  isDisabled?: boolean
}

const Button: FC<ButtonProps> = ({
  className,
  autoFocus,
  onClick,
  label: text,
  isLoading,
  loadingText,
  isDisabled,
  variant,
}) => {
  return (
    <button
      className={className}
      data-style={variant}
      disabled={isLoading ?? isDisabled}
      autoFocus={autoFocus}
      onClick={isDisabled ? undefined : onClick}
      tabIndex={isDisabled ? undefined : 0}>
      {isLoading ? <Loader text={loadingText ?? text} /> : text}
    </button>
  )
}

export default Button
