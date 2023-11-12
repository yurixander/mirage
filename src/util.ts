import React from "react"

export function reflectInputValue(setter: (_: string) => void) {
  return (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value)
}

export function assert(condition: boolean, reasoning: string): asserts condition {
  if (!condition)
    throw new Error(`assertion failed: ${reasoning}`)
}

export function trim(text: string, maxLength: number) {
  return text.length >= maxLength ? `${text.substring(0, maxLength)}...` : text
}
