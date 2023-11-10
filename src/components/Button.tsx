import Loader from "./Loader"

export enum ButtonStyle {
  Primary = "primary",
  TextLink = "text-link"
}

export type ButtonProps = {
  className?: string
  autoFocus?: boolean
  onClick: () => void
  text: string
  isLoading?: boolean
  style?: ButtonStyle
  isDisabled?: boolean
}

export default function Button(props: ButtonProps) {
  return <button
    className={props.className}
    data-style={props.style}
    disabled={props.isLoading || props.isDisabled}
    autoFocus={props.autoFocus}
    onClick={props.onClick}>
    {props.isLoading
      ? <Loader text="Connecting" />
      : props.text}
  </button>
};
