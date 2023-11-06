import "../styles/StatusMessage.sass"

export enum ButtonType {
  Green = "green",
}

type Props = {
  className?: string
  text: string
}

export default function StatusMessage(props: Props) {
  return (
    <div
      className={"StatusMessage " + props.className}>
      {props.text}
    </div>
  )
};
