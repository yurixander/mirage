import "../styles/BottomSmartAction.sass"

export type BottomSmartActionProps = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
  onClick: () => void
}

export default function BottomSmartAction(props: BottomSmartActionProps) {
  return (
    <div className="smart-action" onClick={props.onClick}>
      <props.icon className="icon" />
      <span>{props.text}</span>
    </div>
  )
}
