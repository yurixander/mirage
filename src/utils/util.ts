import dayjs from "dayjs"
import {type ICreateRoomOpts, type MatrixClient} from "matrix-js-sdk"
import {type FileContent} from "use-file-picker/dist/interfaces"
import {v4 as uuidv4} from "uuid"

export enum ViewPath {
  App = "/",
  Login = "/login",
  Development = "/dev",
}

export enum StaticAssetPath {
  AppLogo = "logo.svg",
  AppLogoSmall = "logo-small.svg",
  AddServerIcon = "icons/add-server.svg",
  LoginPhoto = "LoginPhoto.png",
  DotGrid = "icons/dot-grid.svg",
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
}

export function assert(
  condition: boolean,
  reasoning: string
): asserts condition {
  if (!condition) {
    throw new Error(`assertion failed: ${reasoning}`)
  }
}

export function trim(text: string, maxLength: number) {
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

const hexValues = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
]

export function stringToColor(str: string): string {
  let color = "#"

  assert(str.length >= 3, "The string should be at least 3 characters long.")

  for (let index = 0; index < 3; index++) {
    const code = str.charCodeAt(index)

    assert(code <= 255, "The character code should be less than 255")

    const [firstRGB, secondRGB] = [Math.floor(code / 16), code % 16]

    color += hexValues[firstRGB] + hexValues[secondRGB]
  }

  return color
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

// #region Matrix SDK utils

export function getImageUrl(
  url: string | null | undefined,
  client: MatrixClient | null,
  size?: number
): string | undefined {
  if (
    url === null ||
    url === undefined ||
    client === null ||
    url.length === 0
  ) {
    return undefined
  }

  const imageUrl =
    size === undefined
      ? client.mxcUrlToHttp(url)
      : client.mxcUrlToHttp(url, size, size, "scale")

  return imageUrl ?? undefined
}

export type ImageUploadedInfo = {
  matrixUrl: string
  filename: string
  info: {
    w: number
    h: number
    mimetype: string
    size: number
  }
}

export async function sendImageMessageFromFile(
  image: FileContent<string>,
  client: MatrixClient | null,
  destinationRoom: string | null
) {
  if (client === null || destinationRoom === null) {
    return
  }

  const imageUploadedInfo = await uploadImageToMatrix(
    image,
    client,
    _percent => {}
  )

  if (imageUploadedInfo === null) {
    return
  }

  await client.sendImageMessage(
    destinationRoom,
    imageUploadedInfo.matrixUrl,
    {...imageUploadedInfo.info},
    imageUploadedInfo.filename
  )
}

export async function uploadImageToMatrix(
  file: FileContent<string>,
  client: MatrixClient,
  progressCallback: (percent: number) => void
): Promise<ImageUploadedInfo | null> {
  const content = file.content
  const response = await fetch(content)
  const blob = await response.blob()
  const image = await getImage(content)

  try {
    const uploadResponse = await client.uploadContent(blob, {
      type: blob.type,
      progressHandler: progress => {
        progressCallback(Math.round((progress.loaded / progress.total) * 100))
      },
    })

    return {
      matrixUrl: uploadResponse.content_uri,
      filename: file.name,
      info: {
        w: image.width,
        h: image.height,
        mimetype: blob.type,
        size: blob.size,
      },
    }
  } catch (error) {
    console.error("Error uploading file:", error)
  }

  return null
}

export async function getImage(data: string): Promise<HTMLImageElement> {
  return await new Promise(resolve => {
    const img = new Image()

    img.addEventListener("load", () => {
      resolve(img)
    })

    img.src = data
  })
}

export function deleteMessage(
  client: MatrixClient,
  roomId: string,
  eventId: string
) {
  client.redactEvent(roomId, eventId).catch(error => {
    console.error("Error deleting message", error)
  })
}

export async function createSpace(
  client: MatrixClient,
  options: ICreateRoomOpts
): Promise<{room_id: string}> {
  return await client.createRoom({
    ...options,
    creation_content: {
      ...options.creation_content,
      type: "m.space",
    },
  })
}

export const emojiRandom = (): string => {
  const emojiRanges: Array<[number, number]> = [
    [0x1_f6_00, 0x1_f6_4f], // Emoticons
    [0x1_f6_80, 0x1_f6_ff], // Transport and Map Symbols
    [0x26_00, 0x26_ff], // Miscellaneous Symbols
    [0x27_00, 0x27_bf], // Dingbats
    [0x1_f9_00, 0x1_f9_ff], // Supplemental Symbols and Pictographs
  ]

  const [start, end] =
    emojiRanges[Math.floor(Math.random() * emojiRanges.length)]

  const codePoint = Math.floor(Math.random() * (end - start + 1)) + start

  return String.fromCodePoint(codePoint)
}

export function getUsernameByUserId(userId: string): string {
  return userId.replace(":matrix.org", "")
}

export const generateUniqueNumber = (): number => {
  const partialUUID = uuidv4().replaceAll("-", "").slice(0, 15)
  return Number.parseInt(partialUUID, 16)
}
