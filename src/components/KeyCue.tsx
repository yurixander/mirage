import {type FC} from "react"
import {assert} from "../util"
import {twMerge} from "tailwind-merge"

export type KeyCueProps = {
  alt?: boolean
  ctrl?: boolean
  shift?: boolean
  char: string
}

const KeyCue: FC<KeyCueProps> = ({alt, ctrl, shift, char}) => {
  assert(char.length === 1, "key should be a single character")

  return (
    <div
      className={twMerge(
        "inline-block rounded-5 border-b-4 bg-contrastDarker",
        "text-small uppercase leading-160",
        "py-2px px-10px",
        "border-keyCueBorderColor border-solid border-1"
      )}>
      {ctrl && "⌃"}

      {alt && "⌥"}

      {shift && "⇧"}

      {char}
    </div>
  )
}

export default KeyCue
