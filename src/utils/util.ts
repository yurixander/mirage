import dayjs from "dayjs"
import {type MatrixClient} from "matrix-js-sdk"
import {type FileContent} from "use-file-picker/dist/interfaces"

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

export function timeFormatter(timestamp: number): string {
  return dayjs(timestamp).format("hh:mm a")
}

export enum CommonAssertion {
  EventIdNotFound = "To confirm that an event happened, event id should not be undefined.",
  UserIdNotFound = "The client should be logged in.",
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

export function stringToColor(string_: string): string {
  let hash = 0

  // Iterate over string letter by letter
  for (let index = 0; index < string_.length; index++) {
    // hash << 5 move the bit 5 digits (00000010 to 00100000) to the left and subtract the hash value.
    hash = string_.charCodeAt(index) + ((hash << 5) - hash)
  }

  let color = "#"

  // Extract the 3 byte values, red, green and blue
  for (let index = 0; index < 3; index++) {
    // When index = 0 is green, index = 1 is blue, index = 2 is red
    // Move hash index * 8 digits to the right for extract the color.
    // 0xff is equal to 255 and the AND operator (&) is limiting to 8 bits.
    const value = (hash >> (index * 8)) & 0xff

    // value.toString(16) convert value to hex string.
    // 00 if the hexadecimal string is less than two characters ensuring consistent formatting.
    // .slice(-2) extracts the last two characters from the resulting string.
    color += ("00" + value.toString(16)).slice(-2)
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

  const imageUploadedInfo = await uploadFileToMatrix(image, client)

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

export async function uploadFileToMatrix(
  file: FileContent<string>,
  client: MatrixClient
): Promise<ImageUploadedInfo | null> {
  const content = file.content
  const response = await fetch(content)
  const blob = await response.blob()
  const image = await getImage(content)

  try {
    const uploadResponse = await client.uploadContent(blob, {
      type: blob.type,
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
