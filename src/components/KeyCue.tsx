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
    <div className="inline-block rounded-md border border-b-4 border-solid border-neutral-500 bg-neutral-300 px-2 text-xs uppercase leading-160">
      {ctrl && "⌃"}

      {alt && "⌥"}

      {shift && "⇧"}

      {char}
    </div>
  )
}

export default KeyCue
