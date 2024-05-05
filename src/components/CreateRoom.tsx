import {useState, type FC} from "react"
import Button, {ButtonSize, ButtonVariant} from "./Button"
import Typography, {TypographyVariant} from "./Typography"
import Dropdown from "./Dropdown"
import {Preset, Visibility} from "matrix-js-sdk"
import useConnection from "@/hooks/matrix/useConnection"
import {IoIosLock, IoMdGlobe} from "react-icons/io"
import {StaticAssetPath} from "@/utils/util"
import {ReactSVG} from "react-svg"
import InputSection from "./InputSection"
import SwitchButton from "./SwitchButton"

// Initial event that declares the room as encrypted.
const ROOM_ENCRYPTION_OBJECT = {
  type: "m.room.encryption",
  state_key: "",
  content: {
    algorithm: "m.megolm.v1.aes-sha2",
  },
}

export type CreateRoomProps = {
  onClose: () => void
}

const CreateRoom: FC<CreateRoomProps> = ({onClose}) => {
  const [roomName, setRoomName] = useState("")
  const [roomDescription, setRoomDescription] = useState("")
  const [roomVisibility, setRoomVisibility] = useState(Visibility.Private)
  const [enableEncryption, setEnableEncryption] = useState(false)
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const {client} = useConnection()

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
        preset: enableEncryption ? Preset.PrivateChat : undefined,
        initial_state: enableEncryption ? [ROOM_ENCRYPTION_OBJECT] : undefined,
      })
      .then(_roomID => {
        // TODO: Send here notification that the room has been created.

        onClose()
      })
      .catch(_error => {
        // TODO: Send here notification that the room has not been created.

        setIsCreatingRoom(false)
      })
  }

  return (
    <div className="box-border flex max-w-xl flex-col overflow-hidden rounded-md border border-slate-300">
      <div className="w-full border-b border-b-slate-300 bg-gray-50">
        <Typography
          variant={TypographyVariant.H3}
          className="py-3 pl-4 font-sans font-medium text-black">
          Create Room
        </Typography>
      </div>

      <div className="flex flex-col gap-4 bg-white p-5">
        <div className="flex flex-col gap-2">
          <InputSection
            title="Name"
            placeholder="Ej: Gaming Lovers"
            onValueChange={setRoomName}
          />

          <InputSection
            title="Description (optional)"
            placeholder="A brief description about the purpose of this room"
            onValueChange={setRoomDescription}
          />

          <div className="flex flex-col gap-1">
            <Typography variant={TypographyVariant.Span}>
              Room Privacy
            </Typography>

            <Dropdown
              options={[
                {
                  Icon: IoIosLock,
                  label: "Private Room",
                  onClick: () => {
                    setRoomVisibility(Visibility.Private)
                  },
                },
                {
                  Icon: IoMdGlobe,
                  label: "Public Room",
                  onClick: () => {
                    setRoomVisibility(Visibility.Public)
                  },
                },
              ]}
            />
          </div>
        </div>

        {roomVisibility === Visibility.Private && (
          <div className="flex flex-col gap-2">
            <Typography className="text-black" variant={TypographyVariant.P}>
              Only those who are invited will be able to find and join this
              room. You can change this at any time from the room settings
            </Typography>

            <div className="flex justify-between">
              <div className="flex max-w-64 flex-col">
                <Typography
                  className="font-medium text-black"
                  variant={TypographyVariant.Span}>
                  Turn on end-to-end encryption
                </Typography>

                <Typography variant={TypographyVariant.P}>
                  You won't be able to turn it off later. Bridges and most of
                  robots still won't work.
                </Typography>
              </div>

              <SwitchButton
                isInitiallySelected={enableEncryption}
                onSelectionChange={setEnableEncryption}
              />
            </div>
          </div>
        )}

        <div className="flex gap-1 overflow-hidden">
          <ReactSVG src={StaticAssetPath.DotGrid} />

          <ReactSVG src={StaticAssetPath.DotGrid} />
        </div>
      </div>

      <div className="flex w-full justify-end gap-3 border-t border-t-slate-200 bg-gray-50 p-3">
        <Button
          label="Cancel"
          variant={ButtonVariant.TextLink}
          size={ButtonSize.Small}
          onClick={onClose}
        />

        <Button
          label="Create Room"
          isDisabled={client === null}
          isLoading={isCreatingRoom}
          size={ButtonSize.Small}
          onClick={onCreateRoom}
        />
      </div>
    </div>
  )
}

export default CreateRoom
