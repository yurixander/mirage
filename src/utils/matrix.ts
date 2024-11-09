import {
  EventType,
  ICreateRoomStateEvent,
  MsgType,
  type MatrixClient,
} from "matrix-js-sdk"
import {getImage} from "./util"
import {RoomMessageEventContent} from "matrix-js-sdk/lib/types"

export function mxcUrlToHttp(
  client: MatrixClient,
  mxcUrl: string,
  useAuthentication?: boolean,
  width?: number,
  height?: number,
  resizeMethod?: string,
  allowDirectLinks?: boolean,
  allowRedirects?: boolean
): string | null {
  return client.mxcUrlToHttp(
    mxcUrl,
    width,
    height,
    resizeMethod,
    allowDirectLinks,
    allowRedirects,
    useAuthentication
  )
}

function processInitialState(
  options: CreationSpaceOptions
): ICreateRoomStateEvent[] | undefined {
  const {mxcAvatarUrl} = options
  const initialState: ICreateRoomStateEvent[] = []

  if (mxcAvatarUrl !== undefined) {
    initialState.push({
      type: EventType.RoomAvatar,
      content: {
        url: mxcAvatarUrl,
      },
    })
  }

  return mxcAvatarUrl === undefined ? undefined : initialState
}

export type CreationSpaceOptions = {
  name: string
  topic?: string
  mxcAvatarUrl?: string
}

export async function createSpace(
  client: MatrixClient,
  spaceOptions: CreationSpaceOptions
): Promise<{room_id: string}> {
  const {name, topic} = spaceOptions
  const initialState = processInitialState(spaceOptions)

  const spaceId = await client.createRoom({
    name: name,
    topic: topic,
    initial_state: initialState,
    creation_content: {
      type: "m.space",
    },
  })

  return spaceId
}

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
      ? mxcUrlToHttp(client, url, true)
      : mxcUrlToHttp(client, url, true, size, size, "scale")

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
    return
  }

  return mxcUrlToHttp(client, url, true) ?? undefined
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
  image: File,
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
  file: File,
  client: MatrixClient,
  progressCallback: (percent: number) => void
): Promise<ImageUploadedInfo | null> {
  const uploadResponse = await client.uploadContent(file, {
    type: file.type,
    progressHandler: progress => {
      progressCallback(Math.round((progress.loaded / progress.total) * 100))
    },
  })

  const imageUrl = URL.createObjectURL(file)
  const image = await getImage(imageUrl)

  const {height, width} = image

  URL.revokeObjectURL(imageUrl)

  return {
    matrixUrl: uploadResponse.content_uri,
    filename: file.name,
    info: {
      w: width,
      h: height,
      mimetype: file.type,
      size: file.size,
    },
  }
}

export async function sendAudioMessage(
  audioBlob: Blob,
  client: MatrixClient | null,
  destinationRoom: string | null
): Promise<void> {
  if (client === null || destinationRoom === null) {
    return
  }

  const uploadResponse = await client.uploadContent(audioBlob, {
    type: audioBlob.type,
  })

  await client.sendMessage(destinationRoom, {
    msgtype: MsgType.Audio,
    body: "Audio message",
    url: uploadResponse.content_uri,
    info: {
      mimetype: "audio/ogg",
      size: audioBlob.size,
    },
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

export function getUsernameByUserId(userId: string): string {
  return userId.replace(":matrix.org", "")
}

export async function sendVideoMessageFromFile(
  videoFile: File,
  client: MatrixClient | null,
  destinationRoom: string | null,
  onProgressHandler?: (progress: number) => void
): Promise<void> {
  if (client === null || destinationRoom === null) {
    return
  }

  const uploadResponse = await client.uploadContent(videoFile, {
    name: videoFile.name,
    includeFilename: true,
    type: videoFile.type,
    progressHandler: progress => {
      if (onProgressHandler !== undefined) {
        onProgressHandler(Math.round((progress.loaded / progress.total) * 100))
      }
    },
  })

  const content: RoomMessageEventContent = {
    body: videoFile.name,
    info: {
      mimetype: videoFile.type,
      size: videoFile.size,
    },
    msgtype: MsgType.Video,
    url: uploadResponse.content_uri,
  }

  await client.sendEvent(destinationRoom, EventType.RoomMessage, content)
}

export async function sendFileMessageFromFile(
  file: File,
  client: MatrixClient | null,
  destinationRoom: string | null,
  onProgressHandler?: (progressUpload: number) => void
): Promise<void> {
  if (client === null || destinationRoom === null) {
    return
  }

  const uploadResponse = await client.uploadContent(file, {
    name: file.name,
    includeFilename: true,
    type: file.type,
    progressHandler(progress) {
      if (onProgressHandler !== undefined) {
        onProgressHandler(Math.round(progress.loaded / progress.total) * 100)
      }
    },
  })

  const content: RoomMessageEventContent = {
    body: file.name,
    filename: file.name,
    info: {
      mimetype: file.type,
      size: file.size,
    },
    msgtype: MsgType.File,
    url: uploadResponse.content_uri,
  }

  await client.sendEvent(destinationRoom, EventType.RoomMessage, content)
}

export async function sendAudioMessageFromFile(
  file: File,
  client: MatrixClient | null,
  destinationRoom: string | null,
  duration: number,
  onProgressHandler: (progressUpload: number) => void
): Promise<void> {
  if (client === null || destinationRoom === null) {
    return
  }

  const uploadResponse = await client.uploadContent(file, {
    name: file.name,
    includeFilename: false,
    type: file.type,
    progressHandler(progress) {
      onProgressHandler(Math.round(progress.loaded / progress.total) * 100)
    },
  })

  const content: RoomMessageEventContent = {
    body: file.name,
    info: {
      duration,
      mimetype: file.type,
      size: file.size,
    },
    msgtype: MsgType.Audio,
    url: uploadResponse.content_uri,
  }

  await client.sendEvent(destinationRoom, EventType.RoomMessage, content)
}

const mxcRegex = /^mxc:\/\/([^/]+)\/([^/]+)$/

export function validateMxcUrl(url: string): boolean {
  const match = url.match(mxcRegex)

  if (match === null) {
    throw new Error(
      "Invalid MXC URL format. Must be mxc://<server-name>/<media-id>"
    )
  }

  const [_, serverName, mediaId] = match

  if (!serverName || serverName.length === 0) {
    throw new Error("Server name cannot be empty")
  }

  if (!mediaId || mediaId.length === 0) {
    throw new Error("Media ID cannot be empty")
  }

  return true
}

const matrixUserRegex = new RegExp(/^@[\w+.-]+:matrix\.org$/)

export function validateMatrixUser(input: string): boolean {
  return matrixUserRegex.test(input)
}
