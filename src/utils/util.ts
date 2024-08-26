import {getEmojiByIndex} from "@/components/EmojiPicker"
import dayjs from "dayjs"
import {
  EventType,
  MsgType,
  type ICreateRoomOpts,
  type MatrixClient,
} from "matrix-js-sdk"
import {type FileContent} from "use-file-picker/dist/interfaces"

export enum ViewPath {
  App = "/",
  Login = "/login",
  Development = "/dev",
}

export enum StaticAssetPath {
  AppLogo = "logo.svg",
  NewAppLogo = "new-logo.svg",
  AppLogoSmall = "logo-small.svg",
  LoginPhoto = "LoginPhoto.png",
  DotGrid = "icons/dot-grid.svg",
  SpaceHome = "space-home.png",
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
  MessageIdEmpty = "The message id should not be empty.",
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

export function getFileUrl(
  url: string | null | undefined,
  client: MatrixClient | null
): string | undefined {
  if (
    url === null ||
    url === undefined ||
    client === null ||
    url.length === 0
  ) {
    return undefined
  }

  return client.mxcUrlToHttp(url) ?? undefined
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
): Promise<void> {
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
): void {
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

export function getUsernameByUserId(userId: string): string {
  return userId.replace(":matrix.org", "")
}

export const generateUniqueNumber = (): number => {
  const timestamp = Date.now()
  const randomNum = Math.floor(Math.random() * 100_000)
  return Number.parseInt(`${timestamp}${randomNum}`)
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

export type VideoUploadedInfo = {
  matrixUrl: string
  filename: string
  info: {
    mimetype: string
    size: number
  }
}

export async function sendVideoMessageFromFile(
  video: File,
  client: MatrixClient | null,
  destinationRoom: string | null
): Promise<void> {
  if (client === null || destinationRoom === null) {
    return
  }

  try {
    const videoUploadedInfo = await uploadVideoToMatrix(video, client)
    if (videoUploadedInfo !== null) {
      const content = {
        body: videoUploadedInfo.filename,
        filename: videoUploadedInfo.filename,
        info: {
          mimetype: videoUploadedInfo.info.mimetype,
          size: videoUploadedInfo.info.size,
        },
        msgtype: MsgType.Video,
        url: videoUploadedInfo.matrixUrl,
      }

      void client.sendEvent(destinationRoom, EventType.RoomMessage, content)
    }
  } catch (error) {
    console.error(error)
  }
}

export async function uploadVideoToMatrix(
  video: File,
  client: MatrixClient | null
): Promise<VideoUploadedInfo | null> {
  const uploadResponse = await client?.uploadContent(video, {
    name: video.name,
    includeFilename: true,
    type: video.type,
    progressHandler: progress => {
      const uploadProgress = Math.round(
        (progress.loaded / progress.total) * 100
      )
    },
  })

  if (uploadResponse?.content_uri !== undefined) {
    return {
      filename: video.name,
      matrixUrl: uploadResponse?.content_uri,
      info: {
        mimetype: video.type,
        size: video.size,
      },
    }
  }

  return null
}
