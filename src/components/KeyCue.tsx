import {type FC} from "react"
import "../styles/KeyCue.sass"
import {assert} from "../util"

export type KeyCueProps = {
  alt?: boolean
  ctrl?: boolean
  shift?: boolean
  char: string
}

const KeyCue: FC<KeyCueProps> = ({alt, ctrl, shift, char}) => {
  assert(char.length === 1, "key should be a single character")

  return (
    <div className="KeyCue">
      {ctrl && "⌃"}

      {alt && "⌥"}

      {shift && "⇧"}

      {char}
    </div>
  )
}

export default KeyCue
