import {Preset, Visibility} from "matrix-js-sdk"
import {useState} from "react"
import type React from "react"
import useActiveModalStore from "../util/useActiveModal"
import useMatrixClient from "./useMatrixClient"
import usePublicRoomsSearch from "./usePublicRoomsSearch"

// Initial event that declares the room as encrypted.
const ROOM_ENCRYPTION_OBJECT = {
  type: "m.room.encryption",
  state_key: "",
  content: {
    algorithm: "m.megolm.v1.aes-sha2",
  },
}

type UseCreateRoomReturnType = {
  isCreatingRoom: boolean
  isValidAlias: boolean
  isDisabled: boolean
  enableEncryption: boolean
  roomVisibility: Visibility
  onCreateRoom: () => void
  clearActiveModal: () => void
  setRoomName: React.Dispatch<React.SetStateAction<string>>
  setRoomDescription: React.Dispatch<React.SetStateAction<string | undefined>>
  setRoomAddress: React.Dispatch<React.SetStateAction<string>>
  setRoomVisibility: React.Dispatch<React.SetStateAction<Visibility>>
  setEnableEncryption: React.Dispatch<React.SetStateAction<boolean>>
}

const useCreateRoom = (): UseCreateRoomReturnType => {
  const [roomName, setRoomName] = useState("")
  const [roomDescription, setRoomDescription] = useState<string>()
  const [roomVisibility, setRoomVisibility] = useState(Visibility.Private)
  const [enableEncryption, setEnableEncryption] = useState(false)

  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const {clearActiveModal} = useActiveModalStore()
  const client = useMatrixClient()

  const {results, setRoomAddress, roomAddress, isResultLoading} =
    usePublicRoomsSearch(client)

  const onCreateRoom = (): void => {
    if (client === null) {
      return
    }

    setIsCreatingRoom(true)

    void client
      .createRoom({
        visibility: roomVisibility,
        name: roomName,
        topic: roomDescription,
        preset: enableEncryption ? Preset.PrivateChat : Preset.PublicChat,
        initial_state: enableEncryption ? [ROOM_ENCRYPTION_OBJECT] : undefined,
        room_alias_name: roomAddress.length > 0 ? roomAddress : undefined,
      })
      .then(_roomID => {
        // TODO: Send here notification that the room has been created.

        clearActiveModal()
      })
      .catch(_error => {
        // TODO: Send here notification that the room has not been created.

        setIsCreatingRoom(false)
      })
  }

  return {
    onCreateRoom,
    setRoomName,
    setRoomDescription,
    setRoomAddress,
    setRoomVisibility,
    setEnableEncryption,
    isCreatingRoom,
    roomVisibility,
    enableEncryption,
    clearActiveModal,
    isValidAlias: isResultLoading || (results !== null && results.length === 0),
    isDisabled:
      client === null ||
      roomName.length === 0 ||
      (roomVisibility === Visibility.Public && roomAddress.length === 0),
  }
}

export default useCreateRoom
