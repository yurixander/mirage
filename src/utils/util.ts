import {type RosterUserProps, UserPowerLevel} from "@/components/RosterUser"
import {UserStatus} from "@/components/UserProfile"
import dayjs from "dayjs"
import {type Room, type MatrixClient, EventTimeline} from "matrix-js-sdk"
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
  url: string | null | undefined,
  client: MatrixClient | null
): string | undefined {
  if (url === null || url === undefined || client === null) {
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
    console.error("Error uploading image:", error)
  }

  return null
}

export async function getImage(data: string): Promise<HTMLImageElement> {
  return await new Promise(resolve => {
    const img = new Image()

    img.onload = () => {
      resolve(img)
    }

    img.src = data
  })
}

export function getJustDirectRoomsId(client: MatrixClient): string[] {
  const directRooms = client.getAccountData("m.direct")
  const content = directRooms?.event.content

  if (content === undefined) {
    return []
  }

  return Object.values(content).flat()
}

export function getRoomsFromSpace(
  spaceId: string,
  client: MatrixClient
): Room[] {
  const space = client.getRoom(spaceId)

  if (space === null || !space.isSpaceRoom()) {
    throw new Error("The space is not valid.")
  }

  const childEvents = space
    .getLiveTimeline()
    .getState(EventTimeline.FORWARDS)
    ?.events.get("m.space.child")

  if (childEvents === undefined) {
    throw new Error("The selected space does not have associated child rooms.")
  }

  const rooms: Room[] = []
  for (const [stateKey] of childEvents) {
    const room = client.getRoom(stateKey)

    if (room !== null) {
      rooms.push(room)
    }
  }

  return rooms
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

export async function getRoomMembers(
  client: MatrixClient,
  activeRoom: Room
): Promise<RosterUserProps[]> {
  const membersProp: RosterUserProps[] = []
  const joinedMembers = await client.getJoinedRoomMembers(activeRoom.roomId)

  const roomState = activeRoom
    .getLiveTimeline()
    .getState(EventTimeline.FORWARDS)

  if (roomState === null || roomState === undefined) {
    return []
  }

  const powerLevels = roomState
    .getStateEvents("m.room.power_levels", "")
    ?.getContent().users as string[]

  const adminUsersId = Object.keys(powerLevels)

  for (const adminId of adminUsersId) {
    const user = client.getUser(adminId)
    const displayName = user?.displayName ?? user?.userId

    if (user === null || displayName === undefined) {
      continue
    }

    membersProp.push({
      userProfileProps: {
        avatarUrl: getImageUrl(user.avatarUrl, client),
        text: "Online",
        displayName,
        displayNameColor: stringToColor(displayName),
        status: UserStatus.Online,
      },
      powerLevel: UserPowerLevel.Admin,
      onClick: () => {},
      userId: adminId,
    })
  }

  let memberCount = 0

  for (const userId in joinedMembers.joined) {
    if (memberCount >= 20) {
      break
    }

    if (adminUsersId.includes(userId)) {
      continue
    }

    const member = joinedMembers.joined[userId]
    const displayName = member.display_name ?? userId

    membersProp.push({
      userProfileProps: {
        avatarUrl: getImageUrl(member.avatar_url, client),
        text: "Online",
        displayName,
        displayNameColor: stringToColor(displayName),
        status: UserStatus.Online,
      },
      powerLevel: UserPowerLevel.Member,
      onClick: () => {},
      userId,
    })

    memberCount++
  }

  return membersProp
}

export function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ("00" + value.toString(16)).slice(-2)
  }
  return color
}

export function processDisplayname(displayname: string): string {
  return displayname
    .trim()
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
