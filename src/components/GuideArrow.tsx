import {type FC} from "react"
import arrow from "../../public/icons/arrow.svg"
import {ReactComponent as BigStarIcon} from "../../public/icons/big-star.svg"
import {ReactComponent as DotIcon} from "../../public/icons/dot.svg"
import {ReactComponent as LittleStartIcon} from "../../public/icons/little-star.svg"

export enum GuideArrowOrientation {
  Left,
  Right,
}

export type GuideArrowProps = {
  text: string
  orientation: GuideArrowOrientation
}

const GuideArrow: FC<GuideArrowProps> = ({orientation, text}) => {
  const ROTATION_DEGREE_AMOUNT = 15

  const rotation =
    orientation === GuideArrowOrientation.Left
      ? `rotate(-${ROTATION_DEGREE_AMOUNT}deg)`
      : `rotate(${ROTATION_DEGREE_AMOUNT}deg)`

  const arrowFlip = orientation === GuideArrowOrientation.Left ? 1 : -1

  // TODO: `translate` part should be in the SASS file.
  const arrowTransform = `scaleX(${arrowFlip})`

  return (
    <div
      style={{transform: rotation}}
      className="relative mt-14 inline-block rotate-[-15deg] items-center">
      <LittleStartIcon className="absolute bottom-littleStartBottom right-8" />

      <LittleStartIcon className="absolute" />

      <LittleStartIcon className="absolute left-14 top-8" />

      <DotIcon className="absolute -top-2 left-20" />

      <DotIcon className="absolute right-16 top-12" />

      <BigStarIcon className="absolute bottom-bigStarSize right-x1" />

      <span className="inline-block max-w-size-300 bg-rainbow bg-clip-text text-center leading-160 text-transparent">
        {text}
      </span>

      <img
        style={{transform: arrowTransform}}
        src={arrow}
        className="absolute left-1/2 top-arrowSize"
      />
    </div>
  )
}

export default GuideArrow
