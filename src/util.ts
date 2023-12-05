import React from "react"
import dayjs from "dayjs"

export enum Path {
  App = "/",
  Login = "/login",
}

export type Credentials = {
  baseUrl: string
  accessToken: string
  userId: string
}

export function timeFormatter(timestamp: number): string {
  return dayjs(timestamp).format("hh:mm a")
}

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

export function validateUrl(url: string): boolean {
  try {
    new URL(url)

    return true
  } catch {
    return false
  }
}
