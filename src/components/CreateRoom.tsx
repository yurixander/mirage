import {useState, type FC} from "react"
import Button, {ButtonVariant} from "./Button"
import Input from "./Input"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {IoClose} from "react-icons/io5"
import Dropdown from "./Dropdown"
import {Visibility} from "matrix-js-sdk"
import useConnection from "@/hooks/matrix/useConnection"
import {IoIosGlobe, IoIosLock} from "react-icons/io"

export type CreateRoomProps = {
  onClose: () => void
}

const CreateRoom: FC<CreateRoomProps> = ({onClose}) => {
  const [roomName, setRoomName] = useState("")
  const [roomTopic, setRoomTopic] = useState("")
  const [roomVisibility, setRoomVisibility] = useState(Visibility.Private)
  const {client} = useConnection()

  const onCreateRoom = () => {
    if (client === null) {
      return
    }

    void client
      .createRoom({
        visibility: roomVisibility,
        name: roomName,
        topic: roomTopic,
      })
      .then(_roomID => {
        // TODO: Send here notification that the room has been created.

        onClose()
      })
      .catch(_error => {
        // TODO: Send here notification that the room has not been created.
      })
  }

  return (
    <div className="flex flex-col gap-4 rounded border border-neutral-300 bg-white p-5 shadow-sm">
      <div>
        <div className="float-right">
          <IconButton tooltip="Close" onClick={onClose} Icon={IoClose} />
        </div>

        <Typography variant={TypographyVariant.H3}>Create Room</Typography>
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant={TypographyVariant.Span}>Name</Typography>

        <Input
          initialValue={roomName}
          onValueChange={setRoomName}
          placeholder="Name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant={TypographyVariant.Span}>
          Topic (optional)
        </Typography>

        <Input
          initialValue={roomTopic}
          onValueChange={setRoomTopic}
          placeholder="Topic (optional)"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant={TypographyVariant.Span}>
          Select visibility
        </Typography>

        <Dropdown
          options={[
            {
              label: "Private Room (invite only)",
              Icon: IoIosLock,
              onClick: () => {
                setRoomVisibility(Visibility.Private)
              },
            },
            {
              label: "Public Room",
              Icon: IoIosGlobe,
              onClick: () => {
                setRoomVisibility(Visibility.Public)
              },
            },
          ]}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant={ButtonVariant.Secondary}
          onClick={onClose}
          label="Cancel"
        />
        <Button onClick={onCreateRoom} label="Create" />
      </div>
    </div>
  )
}

export default CreateRoom
