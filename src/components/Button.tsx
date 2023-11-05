import Loader from "./Loader"

export enum ButtonType {
  Green = "green",
}

type Props = {
  className?: string
  autoFocus?: boolean
  onClick: () => void
  text: string
  isLoading?: boolean
  type?: ButtonType
}

export default function Button(props: Props) {
  return <button
    className={props.className}
    data-type={props.type}
    disabled={props.isLoading}
    autoFocus={props.autoFocus}
    onClick={props.onClick}>
    {props.isLoading
      ? <Loader text="Processing" />
      : props.text}
  </button>
};
