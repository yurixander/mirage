import React from "react"

export function reflectInputValue(setter: (_: string) => void) {
  return (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value)
}
