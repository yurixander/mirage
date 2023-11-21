import "../styles/BottomSmartAction.sass"

export type BottomSmartActionProps = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
}

export default function BottomSmartAction(props: BottomSmartActionProps) {
  return (
    <div className="smart-action">
      <props.icon className="icon" />
      <span>{props.text}</span>
    </div>
  )
}
