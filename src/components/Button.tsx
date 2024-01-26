import Loader from "@/components/Loader"
import "../styles/Button.sass"
import {type FC} from "react"

export enum ButtonStyle {
  Primary = "primary",
  Green = "green",
  TextLink = "text-link",
  Default = "default",
}

export type ButtonProps = {
  className?: string
  autoFocus?: boolean
  onClick: () => void
  text: string
  isLoading?: boolean
  loadingText?: string
  style?: ButtonStyle
  isDisabled?: boolean
}

const Button: FC<ButtonProps> = ({
  className,
  autoFocus,
  onClick,
  text,
  isLoading,
  loadingText,
  style,
  isDisabled,
}) => {
  return (
    <button
      className={className}
      data-style={style}
      disabled={isLoading ?? isDisabled}
      autoFocus={autoFocus}
      onClick={isDisabled ? undefined : onClick}
      tabIndex={isDisabled ? undefined : 0}>
      {isLoading ? <Loader text={loadingText ?? text} /> : text}
    </button>
  )
}

export default Button
