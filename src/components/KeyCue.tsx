import "../styles/KeyCue.sass"
import {assert} from "../util"

export type KeyCueProps = {
  alt?: boolean
  ctrl?: boolean
  shift?: boolean
  char: string
}

export default function KeyCue(props: KeyCueProps) {
  assert(props.char.length === 1, "char should be a single character")

  return (
    <div className="KeyCue">
      {props.ctrl && "⌃"}
      {props.alt && "⌥"}
      {props.shift && "⇧"}
      {props.char}
    </div>
  )
}
