import Loader from "./Loader"

export enum ButtonType {
  Primary = "primary",
}

type Props = {
  className?: string
  autoFocus?: boolean
  onClick: () => void
  text: string
  isLoading?: boolean
  type?: ButtonType
  isDisabled?: boolean
}

export default function Button(props: Props) {
  return <button
    className={props.className}
    data-type={props.type}
    disabled={props.isLoading || props.isDisabled}
    autoFocus={props.autoFocus}
    onClick={props.onClick}>
    {props.isLoading
      ? <Loader text="Connecting" />
      : props.text}
  </button>
};
