import "../styles/Label.sass"

export type LabelProps = {
  text: string
}

export default function Label(props: LabelProps) {
  return <div className="Label">
    {props.text}
  </div>
}
