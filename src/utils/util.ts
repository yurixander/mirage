import {getEmojiByIndex} from "@/hooks/util/useEmojiPicker"
import dayjs from "dayjs"

export enum ViewPath {
  App = "/",
  Login = "/login",
  Development = "/dev",
}

export enum StaticAssetPath {
  AppLogo = "logo-small.webp",
  LoginPhoto = "LoginPhoto.webp",
  DotGrid = "icons/dot-grid.svg",
  SpaceHome = "space-home.webp",
  CreateSpace = "icons/create-space.svg",
}

export type Credentials = {
  baseUrl: string
  accessToken: string
  userId: string
  deviceId: string
}

export function formatTime(timestamp: number): string {
  return dayjs(timestamp).format("hh:mm a")
}

export enum CommonAssertion {
  EventIdNotFound = "To confirm that an event happened, event id should not be undefined.",
  UserIdNotFound = "The client should be logged in.",
  EventSenderNotFount = "The event should has a send origin",
  AvatarUrlNotValid = "The avatar url should be valid.",
}

export function assert(
  condition: boolean,
  reasoning: string
): asserts condition {
  if (!condition) {
    throw new Error(`assertion failed: ${reasoning}`)
  }
}

export function trim(text: string, maxLength: number): string {
  return text.length >= maxLength
    ? `${text.slice(0, Math.max(0, maxLength))}...`
    : text
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)

    return true
  } catch {
    return false
  }
}

function stringToIndex(str: string): number {
  let totalSum = 0

  for (let i = 0; i < str.length; i++) {
    totalSum += str.charCodeAt(i) + (i + 1)
  }

  return totalSum % colors.length
}

const colors: string[] = [
  "#FFC312",
  "#C4E538",
  "#12CBC4",
  "#FDA7DF",
  "#ED4C67",
  "#F79F1F",
  "#A3CB38",
  "#1289A7",
  "#D980FA",
  "#B53471",
  "#EE5A24",
  "#009432",
  "#0652DD",
  "#9980FA",
  "#833471",
  "#EA2027",
  "#006266",
  "#1B1464",
  "#5758BB",
  "#6F1E51",
]

export function stringToColor(str: string): string {
  const colorIndex = stringToIndex(str)

  return colors[colorIndex]
}

export const stringToEmoji = (str: string): string => {
  const emojiIndex = stringToIndex(str)
  const emoji = getEmojiByIndex(emojiIndex)

  return emoji.skins[0].native
}

export function cleanDisplayName(displayName: string): string {
  return displayName
    .trim()
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const ASCII_LIMIT = 127

export function normalizeName(displayName: string): string {
  return displayName
    .split("")
    .filter(char => char.charCodeAt(0) <= ASCII_LIMIT)
    .join("")
}

export function strCapitalize(str: string): string {
  return str.charAt(0).toUpperCase().concat(str.slice(1))
}

// #region Matrix SDK utils
export async function getImage(data: string): Promise<HTMLImageElement> {
  assert(isValidObjectURL(data), "Invalid object URL")

  return await new Promise(resolve => {
    const img = new Image()

    img.addEventListener("load", () => {
      resolve(img)
    })

    img.src = data
  })
}

function isValidObjectURL(url: string): boolean {
  try {
    const objUrl = new URL(url)

    return objUrl.protocol === "blob:"
  } catch {
    return false
  }
}

export function generateRandomId(length: number = 10): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  let result = ""

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export async function delay(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms))
}
