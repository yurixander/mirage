import {useCallback} from "react"
import useEventListener from "@/hooks/matrix/useEventListener"
import {EventType, type Room, RoomEvent} from "matrix-js-sdk"
import {KnownMembership} from "matrix-js-sdk/lib/@types/membership"
import {assert} from "@/utils/util"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {getJoinedSpaces} from "@/utils/spaces"
import {type ValueState} from "@/hooks/util/useValueState"
import useMatrixValue from "@/hooks/matrix/useMatrixValue"
import {LangKey} from "@/lang/allKeys"
import useTranslation from "@/hooks/util/useTranslation"
import {
  createSpace,
  CreationSpaceOptions,
  getImageUrl,
  uploadImageToMatrix,
  validateMxcUrl,
} from "@/utils/matrix"

export type PartialSpace = {
  name: string
  spaceId: string
  avatarUrl?: string
}

const processSpace = (space: Room): PartialSpace => {
  return {
    name: space.name,
    spaceId: space.roomId,
    avatarUrl: getImageUrl(space.getMxcAvatarUrl(), space.client),
  }
}

type UseSpacesReturnType = {
  spaces: ValueState<PartialSpace[]>
  onSpaceExit: (spaceId: string) => void
  onCreateSpace: (spaceOptions: CreationSpaceOptions) => Promise<void>
  uploadSpaceAvatar: (
    file: File,
    progressCallback: (percent: number) => void
  ) => Promise<string>
}

const useSpaces = (): UseSpacesReturnType => {
  const client = useMatrixClient()
  const {t} = useTranslation()

  const {state: spaces, setState: setSpacesState} = useMatrixValue(
    async client => {
      const joinedSpaces = await getJoinedSpaces(client)

      return joinedSpaces.map(element => processSpace(element))
    }
  )

  const onSpaceExit = useCallback(
    (spaceId: string) => {
      if (client === null) {
        return
      }

      void client.leave(spaceId)
    },
    [client]
  )

  const onCreateSpace = async (
    spaceOptions: CreationSpaceOptions
  ): Promise<void> => {
    if (client === null) {
      throw new Error(t(LangKey.ClientMustBeInitialized))
    }

    const {name, topic, mxcAvatarUrl} = spaceOptions

    assert(name.length > 0, t(LangKey.SpaceNameEmptyError))

    if (topic !== undefined) {
      assert(topic.length > 0, t(LangKey.SpaceTopicEmptyError))
    }

    if (mxcAvatarUrl !== undefined) {
      validateMxcUrl(mxcAvatarUrl)
    }

    await createSpace(client, spaceOptions)
  }

  const uploadSpaceAvatar = useCallback(
    async (
      file: File,
      progressCallback: (percent: number) => void
    ): Promise<string> => {
      if (client === null) {
        throw new Error(t(LangKey.ClientMustBeInitialized))
      }

      const uploadResult = await uploadImageToMatrix(
        file,
        client,
        progressCallback
      )

      if (uploadResult?.matrixUrl === undefined) {
        throw new Error(t(LangKey.ImageUploadedError))
      }

      return uploadResult.matrixUrl
    },
    [client, t]
  )

  useEventListener(RoomEvent.Timeline, (event, room) => {
    if (event.getType() !== EventType.RoomCreate || room === undefined) {
      return
    }

    if (!room.isSpaceRoom()) {
      return
    }

    setSpacesState(prev => {
      if (prev.status !== "success") {
        return prev
      }

      return {status: "success", data: [...prev.data, processSpace(room)]}
    })
  })

  useEventListener(RoomEvent.Name, room => {
    if (!room.isSpaceRoom()) {
      return
    }

    setSpacesState(prev => {
      if (prev.status !== "success") {
        return prev
      }

      const index = prev.data.findIndex(space => space.spaceId === room.roomId)

      if (index === -1) {
        return prev
      }

      const newSpaces = [...prev.data]
      newSpaces[index] = processSpace(room)

      return {
        status: "success",
        data: newSpaces,
      }
    })
  })

  useEventListener(RoomEvent.MyMembership, (room, membership) => {
    if (
      membership !== KnownMembership.Leave &&
      membership !== KnownMembership.Ban
    ) {
      return
    }

    if (!room.isSpaceRoom()) {
      return
    }

    setSpacesState(prev => {
      if (prev.status !== "success") {
        return prev
      }

      return {
        status: "success",
        data: prev.data.filter(space => space.spaceId !== room.roomId),
      }
    })
  })

  return {spaces, onSpaceExit, onCreateSpace, uploadSpaceAvatar}
}

export default useSpaces
