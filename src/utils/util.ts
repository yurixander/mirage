import dayjs from "dayjs"
import {type MatrixClient} from "matrix-js-sdk"

export enum ViewPath {
  App = "/",
  Login = "/login",
  Development = "/dev",
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

export function getUsernameByUserID(userId: string): string {
  return userId.replace(":matrix.org", "")
}

export function getImageUrl(
  url: string | null,
  client: MatrixClient
): string | undefined {
  if (url === null) return undefined
  return client.mxcUrlToHttp(url, 48, 48, "scale") ?? undefined
}
