import "../styles/GuideArrow.sass"
import BigStarIcon from "../../public/icons/big-star.svg"
import arrow from "../../public/icons/arrow.svg"
import DotIcon from "../../public/icons/dot.svg"
import {ReactComponent as LittleStartIcon} from "../../public/icons/little-star.svg"

export enum GuideArrowOrientation {
  Left,
  Right,
}

export type GuideArrowProps = {
  text: string
  orientation: GuideArrowOrientation
}

export default function GuideArrow(props: GuideArrowProps) {
  const ROTATION_DEGREE_AMOUNT = 15

  const rotation =
    props.orientation === GuideArrowOrientation.Left
      ? `rotate(-${ROTATION_DEGREE_AMOUNT}deg)`
      : `rotate(${ROTATION_DEGREE_AMOUNT}deg)`

  const arrowFlip = props.orientation === GuideArrowOrientation.Left ? 1 : -1

  // TODO: `translate` part should be in the SASS file.
  const arrowTransform = `scaleX(${arrowFlip})`

  return (
    <div style={{transform: rotation}} className="GuideArrow">
      <img src={LittleStartIcon} className="little-star" />
      <img src={LittleStartIcon} className="little-star" />
      <img src={LittleStartIcon} className="little-start" />
      <img src={DotIcon} className="dot" />
      <img src={DotIcon} className="dot" />
      <img src={BigStarIcon} className="big-star" />
      <span className="text">{props.text}</span>
      <img style={{transform: arrowTransform}} src={arrow} className="arrow" />
    </div>
  )
}
