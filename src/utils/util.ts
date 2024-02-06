import dayjs from "dayjs"

export enum ViewPath {
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

export function assert(
  condition: boolean,
  reasoning: string
): asserts condition {
  if (!condition) throw new Error(`assertion failed: ${reasoning}`)
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

export function checkCredentials({accessToken, baseUrl, userId}: Credentials) {
  if (accessToken.length === 0) {
    throw new Error("Access token should not be empty")
  }
  if (baseUrl.length === 0) {
    throw new Error("Server url should not be empty")
  }
  if (userId.length === 0) {
    throw new Error("User id should not be empty")
  }
}
