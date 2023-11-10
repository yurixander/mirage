import Loader from "./Loader"

export enum ButtonStyle {
  Primary = "primary",
  TextLink = "text-link"
}

type Props = {
  className?: string
  autoFocus?: boolean
  onClick: () => void
  text: string
  isLoading?: boolean
  style?: ButtonStyle
  isDisabled?: boolean
}

export default function Button(props: Props) {
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
