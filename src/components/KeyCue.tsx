import {type FC} from "react"
import {assert} from "../utils/util"

export type KeyCueProps = {
  alt?: boolean
  ctrl?: boolean
  shift?: boolean
  char: string
}

const KeyCue: FC<KeyCueProps> = ({alt, ctrl, shift, char}) => {
  assert(char.length === 1, "key should be a single character")

  return (
    <div className="leading-160 inline-block rounded-md border border-b-4 border-solid border-neutral-500 bg-neutral-300 px-2 text-xs uppercase">
      {ctrl && "⌃"}

      {alt && "⌥"}

      {shift && "⇧"}

      {char}
    </div>
  )
}

export default KeyCue
