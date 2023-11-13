import "../styles/IconButton.sass"

export type IconButtonProps = {
  onClick: () => void
  tooltip: string
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export default function IconButton(props: IconButtonProps) {
  // TODO: Make use of tooltip.

  return (
    <div
      className="IconButton"
      onClick={props.onClick}>
      <props.icon />
    </div>
  )
}
