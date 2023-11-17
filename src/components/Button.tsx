import Loader from "./Loader"
import "../styles/Button.sass"

export enum ButtonStyle {
  Primary = "primary",
  Green = "green",
  TextLink = "text-link",
  Default = "default"
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

export default function Button(props: ButtonProps) {
  return (
    <button
      className={props.className}
      data-style={props.style}
      disabled={props.isLoading || props.isDisabled}
      autoFocus={props.autoFocus}
      onClick={props.onClick}>
      {props.isLoading
        ? <Loader text={props.loadingText || props.text} />
        : props.text}
    </button>
  )
}
