import {
  EventType,
  ICreateRoomStateEvent,
  type MatrixClient,
} from "matrix-js-sdk"

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
