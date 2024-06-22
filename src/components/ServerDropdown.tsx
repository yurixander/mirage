import Avatar from "boring-avatars"
import {useState, type FC} from "react"
import Typography from "./Typography"
import {twMerge} from "tailwind-merge"
import {
  CUTEFUNNYART_SERVER,
  MATRIX_SERVER,
  TRYGVEME_SERVER,
  type Server,
} from "@/utils/servers"
import Dropdown from "./Dropdown"
import {IoMdCheckmark} from "react-icons/io"

const servers = [MATRIX_SERVER, CUTEFUNNYART_SERVER, TRYGVEME_SERVER]

export type ServerDropdownProps = {
  initiallyServerSelected: Server
  onServerSelected: (server: Server) => void
}

const ServerDropdown: FC<ServerDropdownProps> = ({
  onServerSelected,
  initiallyServerSelected,
}) => {
  const [serverSelected, setServerSelected] = useState(initiallyServerSelected)

  return (
    <Dropdown
      initiallyContent={
        <div className="flex items-center gap-2">
          <div className="size-6 overflow-hidden rounded-md border-2 border-orange-500">
            <Avatar
              square
              variant="bauhaus"
              size={28}
              name={serverSelected.name}
              colors={["#FF6B00", "#F21F26", "#FFFF8E", "#EBC83A", "#15C070"]}
            />
          </div>

          <Typography className="font-medium">{serverSelected.name}</Typography>
        </div>
      }>
      <div className="flex h-max w-full flex-col border-t border-t-slate-300">
        {servers.map((server, index) => (
          <DropdownServerItem
            key={index}
            serverName={server.name}
            isSelected={server === serverSelected}
            className="p-1 hover:bg-neutral-100"
            onClick={() => {
              setServerSelected(server)
              onServerSelected(server)
            }}
          />
        ))}
      </div>
    </Dropdown>
  )
}

type DropdownServerItemProps = {
  serverName: string
  isSelected: boolean
  className?: string
  onClick?: () => void
}

const DropdownServerItem: FC<DropdownServerItemProps> = ({
  serverName,
  onClick,
  isSelected,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge("flex items-center gap-2", className)}>
      <div className="size-6 overflow-hidden rounded-md border-2 border-orange-500">
        <Avatar
          square
          variant="bauhaus"
          size={28}
          name={serverName}
          colors={["#FF6B00", "#F21F26", "#FFFF8E", "#EBC83A", "#15C070"]}
        />
      </div>

      <Typography className="font-medium">{serverName}</Typography>

      {isSelected && <IoMdCheckmark className="ml-auto text-slate-300" />}
    </button>
  )
}

export default ServerDropdown
