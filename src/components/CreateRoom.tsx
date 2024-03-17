import {type FC} from "react"
import Button from "./Button"
import Input from "./Input"
import Typography, {TypographyVariant} from "./Typography"
import IconButton from "./IconButton"
import {IoClose} from "react-icons/io5"
import Dropdown from "./Dropdown"

const CreateRoom: FC = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[10px] border-[1px] border-solid border-neutral-300 bg-slate-50 p-5 shadow-sm">
      <div>
        <div className="float-right">
          <IconButton tooltip="Close" onClick={() => {}} Icon={IoClose} />
        </div>
        <Typography variant={TypographyVariant.H3}>Create Room</Typography>
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant={TypographyVariant.Span}>Name</Typography>
        <Input placeholder="Name"></Input>
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant={TypographyVariant.Span}>
          Topic (optional)
        </Typography>
        <Input placeholder="Topic (optional)"></Input>
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant={TypographyVariant.Span}>Select type of room</Typography>
        <Dropdown
          options={[{label: "Private Room (invite only)", value: "0", onClick: () => {}},{label: "Public Room", value: "0", onClick: () => {}}]}
        />
      </div>
      <div className="text-center">
        <div className="float-right">
          <Button onClick={() => {}} label="Create" />
        </div>
      </div>
    </div>
  )
}

export default CreateRoom
