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

export enum StaticAssetPath {
  AppLogo = "logo.svg",
  AppLogoSmall = "logo-small.svg",
  AddServerIcon = "icons/add-server.svg",
  LoginPhoto = "LoginPhoto.png",
}

export type Credentials = {
  baseUrl: string
  accessToken: string
  userId: string
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

export function timeFormatter(timestamp: number): string {
  return dayjs(timestamp).format("hh:mm a")
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

export function getImageUrl(
  url: string | null | undefined,
  client: MatrixClient | null
): string | undefined {
  if (url === null || url === undefined || client === null) {
    return undefined
  }

  const SIZE = 48

  return client.mxcUrlToHttp(url, SIZE, SIZE, "scale") ?? undefined
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

export function getDirectRoomsIds(client: MatrixClient): string[] {
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

export function deleteMessage(
  client: MatrixClient,
  roomId: string,
  eventId: string
) {
  client.redactEvent(roomId, eventId).catch(error => {
    console.error("Error deleting message", error)
  })
}

export function isUserRoomAdmin(room: Room, client: MatrixClient): boolean {
  const MIN_ADMIN_POWER_LEVEL = 50
  const roomState = room.getLiveTimeline().getState(EventTimeline.FORWARDS)
  const userId = client.getUserId()

  if (roomState === undefined || userId === null) {
    return false
  }

  const powerLevels = roomState
    .getStateEvents("m.room.power_levels", "")
    ?.getContent().users as string[]

  const users = Object.entries(powerLevels)

  for (const [adminId, powerLevel] of users) {
    if (typeof powerLevel !== "number" || powerLevel < MIN_ADMIN_POWER_LEVEL) {
      continue
    }

    if (adminId === userId) {
      return true
    }
  }

  return false
}

export async function getRoomMembers(
  client: MatrixClient,
  room: Room
): Promise<RosterUserProps[]> {
  const membersProperty: RosterUserProps[] = []
  const members = await client.getJoinedRoomMembers(room.roomId)
  const joinedMembers = members.joined

  const roomState = room.getLiveTimeline().getState(EventTimeline.FORWARDS)

  if (roomState === undefined) {
    return []
  }

  const powerLevels = roomState
    .getStateEvents("m.room.power_levels", "")
    ?.getContent().users as string[]

  const users = Object.entries(powerLevels)
  const adminUsersId: string[] = []

  const MIN_MOD_POWER_LEVEL = 50
  const MIN_ADMIN_POWER_LEVEL = 100

  for (const [adminId, powerLevel] of users) {
    if (typeof powerLevel !== "number" || powerLevel < MIN_MOD_POWER_LEVEL) {
      continue
    }

    adminUsersId.push(adminId)
    const member = joinedMembers[adminId]
    const displayName = normalizeName(member.display_name)
    const isAdmin = powerLevel === MIN_ADMIN_POWER_LEVEL

    membersProperty.push({
      // TODO: Use actual props instead of dummy data.
      userProfileProps: {
        avatarUrl: getImageUrl(member.avatar_url, client),
        text: "Online",
        displayName,
        displayNameColor: stringToColor(displayName),
        status: UserStatus.Online,
      },
      powerLevel: isAdmin ? UserPowerLevel.Admin : UserPowerLevel.Moderator,
      onClick: () => {},
      userId: adminId,
    })
  }

  let memberCount = 0

  for (const userId in joinedMembers) {
    if (memberCount >= 20) {
      break
    }

    if (adminUsersId.includes(userId)) {
      continue
    }

    const member = joinedMembers[userId]
    const displayName = normalizeName(member.display_name ?? userId)

    membersProperty.push({
      // TODO: Use actual props instead of dummy data.
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

    memberCount += 1
  }

  return membersProperty
}

export function stringToColor(string_: string): string {
  let hash = 0

  for (let index = 0; index < string_.length; index++) {
    hash = string_.charCodeAt(index) + ((hash << 5) - hash)
  }

  let color = "#"

  for (let index = 0; index < 3; index++) {
    const value = (hash >> (index * 8)) & 0xff

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

export function getLastReadEventIdFromRoom(
  room: Room,
  client: MatrixClient
): string | null {
  const userId = client.getUserId()

  if (userId === null) {
    return null
  }

  const eventReadUpTo = room.getEventReadUpTo(userId)

  if (eventReadUpTo === null) {
    return null
  }

  return room.findEventById(eventReadUpTo)?.getId() ?? null
}

const ASCII_LIMIT = 127

export function normalizeName(displayName: string): string {
  return displayName
    .split("")
    .filter(char => char.charCodeAt(0) <= ASCII_LIMIT)
    .join("")
}
