import {useState, type FC} from "react"
import Button from "./Button"
import Input from "./Input"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {IoClose} from "react-icons/io5"
import Dropdown from "./Dropdown"
import {Visibility} from "matrix-js-sdk"
import {createRoom} from "@/utils/util"
import useConnection from "@/hooks/matrix/useConnection"

export type CreateRoomProps = {
  onClose: () => void
}

const CreateRoom: FC<CreateRoomProps> = ({onClose}) => {
  const [roomName, setRoomName] = useState("")
  const [roomTopic, setRoomTopic] = useState("")
  const [roomVisibility, setRoomVisibility] = useState(Visibility.Private)
  const {client} = useConnection()

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-300 bg-slate-50 p-5 shadow-sm">
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
          Select type of room
        </Typography>

        <Dropdown
          options={[
            {
              label: "Private Room (invite only)",
              value: Visibility.Private,
              onClick: () => {
                setRoomVisibility(Visibility.Private)
              },
            },
            {
              label: "Public Room",
              value: Visibility.Public,
              onClick: () => {
                setRoomVisibility(Visibility.Public)
              },
            },
          ]}
        />
      </div>
      <div className="text-center">
        <div className="float-right">
          <Button
            onClick={() => {
              void createRoom(client, roomName, roomVisibility, roomTopic).then(
                isCreated => {
                  if (!isCreated) {
                    // TODO: Send here notification that the room has not been created.
                    return
                  }

                  // TODO: Send here notification that the room has been created.
                  onClose()
                }
              )
            }}
            label="Create"
          />
        </div>
      </div>
    </div>
  )
}

export default CreateRoom
