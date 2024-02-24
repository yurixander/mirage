import dayjs from "dayjs"
import {type Room, type MatrixClient} from "matrix-js-sdk"
import {type FileContent} from "use-file-picker/dist/interfaces"

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
  client: MatrixClient | null
): string | undefined {
  if (url === null || client === null) {
    return undefined
  }

  return client.mxcUrlToHttp(url, 48, 48, "scale") ?? undefined
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
    {
      ...imageUploadedInfo.info,
    },
    imageUploadedInfo.filename
  )
}

export type FileUploadedInfo = {
  matrixUrl: string
  filename: string
  info: {
    w: number
    h: number
    mimetype: string
    size: number
  }
}

export async function uploadFileToMatrix(
  file: FileContent<string>,
  client: MatrixClient
): Promise<FileUploadedInfo | null> {
  const content = file.content
  const response = await fetch(content)
  const blob = await response.blob()
  const dimensions = await getImageDimensions(content)

  try {
    const uploadResponse = await client.uploadContent(blob, {
      type: blob.type,
    })

    return {
      matrixUrl: uploadResponse.content_uri,
      filename: file.name,
      info: {...dimensions, mimetype: blob.type, size: blob.size},
    }
  } catch (error) {
    console.error("Error uploading image:", error)
  }

  return null
}

export type ImageDimensions = {
  w: number
  h: number
}

export async function getImageDimensions(
  data: string
): Promise<ImageDimensions> {
  return await new Promise(resolve => {
    const img = new Image()

    img.onload = () => {
      resolve({w: img.width, h: img.height})
    }

    img.src = data
  })
}

export function getJustDirectRooms(
  rooms: Room[],
  client: MatrixClient
): Room[] {
  const roomsDirect: Room[] = []
  const directRooms = client.getAccountData("m.direct")
  const content = directRooms?.event.content

  if (content === undefined) {
    return roomsDirect
  }

  const directRoomIds = Object.values(content).flat()

  for (const room of rooms) {
    if (directRoomIds.includes(room.roomId) && !room.isSpaceRoom()) {
      roomsDirect.push(room)
    }
  }

  return roomsDirect
}

// TODO: Handle that can delete message just the administrators or the user
export function deleteMessage(
  client: MatrixClient,
  roomId: string,
  eventId: string
) {
  client.redactEvent(roomId, eventId).catch(error => {
    console.error("Error deleting message", error)
  })
}
