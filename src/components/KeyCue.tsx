import type {FC} from "react"
import {assert} from "../utils/util"
import {cn} from "@/utils/utils"

type KeyCueSize = "default" | "sm"

export type KeyCueProps = {
  alt?: boolean
  ctrl?: boolean
  shift?: boolean
  size?: KeyCueSize
  className?: string
  char: string
}

const KeyCue: FC<KeyCueProps> = ({
  alt,
  ctrl,
  shift,
  size = "default",
  char,
  className,
}) => {
  assert(char.length === 1, "key should be a single character")

  return (
    <div
      className={cn(
        "inline-block size-max rounded-md border border-b-4 border-solid border-neutral-500 bg-neutral-300 px-2 text-xs uppercase leading-160 dark:border-neutral-400 dark:bg-neutral-700",
        size === "sm" &&
          "rounded-sm border-b-[3px] px-1.5 py-0.5 leading-[100%]",
        className
      )}>
      {ctrl && "⌃"}

      {alt && "⌥"}

      {shift && "⇧"}

      {char}
    </div>
  )
}

export default KeyCue
