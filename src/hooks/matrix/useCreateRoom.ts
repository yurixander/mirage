import {Visibility, Preset} from "matrix-js-sdk"
import {useState} from "react"
import useConnection from "./useConnection"
import {useSidebarModalActiveStore} from "@/containers/NavigationSection/hooks/useSidebarActions"
import usePublicRoomsSearch from "./usePublicRoomsSearch"

// Initial event that declares the room as encrypted.
const ROOM_ENCRYPTION_OBJECT = {
  type: "m.room.encryption",
  state_key: "",
  content: {
    algorithm: "m.megolm.v1.aes-sha2",
  },
}

const useCreateRoom = () => {
  const [roomName, setRoomName] = useState("")
  const [roomDescription, setRoomDescription] = useState<string>()
  const [roomVisibility, setRoomVisibility] = useState(Visibility.Private)
  const [enableEncryption, setEnableEncryption] = useState(false)
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const {clearActiveSidebarModal} = useSidebarModalActiveStore()
  const {client} = useConnection()
  const {results, setRoomAddress, roomAddress} = usePublicRoomsSearch(client)

  const onCreateRoom = () => {
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

        clearActiveSidebarModal()
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
    clearActiveSidebarModal,
    isValidAlias: !(results !== null && results.length > 0),
    isDisabled:
      client === null ||
      roomName.length <= 0 ||
      (roomVisibility === Visibility.Public && roomAddress.length <= 0),
  }
}

export default useCreateRoom
