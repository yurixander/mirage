import {Placement} from "tippy.js"
import "../styles/IconButton.sass"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

export type IconButtonProps = {
  onClick: () => void
  tooltip: string
  tooltipPlacement: Placement
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export default function IconButton(props: IconButtonProps) {
  const TOOLTIP_SHOW_DELAY = 1000

  // TODO: Style tooltip to have consistent typography (ex. default font size and weight, etc.).
  return (
    <Tippy
      content={props.tooltip}
      arrow={true}
      delay={TOOLTIP_SHOW_DELAY}
      placement={props.tooltipPlacement}>
      <div
        className="IconButton"
        onClick={props.onClick}>
        <props.icon />
      </div>
    </Tippy>
  )
}
