import {Placement} from "tippy.js"
import "../styles/IconButton.sass"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale-subtle.css"

export type IconButtonProps = {
  onClick: () => void
  tooltip: string
  tooltipPlacement: Placement
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export default function IconButton(props: IconButtonProps) {
  return (
    <Tippy
      content={<span className="tooltip-text">{props.tooltip}</span>}
      arrow={true}
      inertia={true}
      animation="scale-subtle"
      duration={100}
      placement={props.tooltipPlacement}>
      <div
        className="IconButton"
        onClick={props.onClick}>
        <props.icon className="icon" />
      </div>
    </Tippy>
  )
}
