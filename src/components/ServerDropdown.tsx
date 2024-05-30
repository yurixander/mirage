import Avatar from "boring-avatars"
import {useState, type FC} from "react"
import Typography from "./Typography"
import {IoCaretDownOutline, IoCaretUpOutline} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import Servers from "@/utils/servers"

export type Server = {
  name: string
  url: Servers
}

const servers: Server[] = [
  {name: "Matrix.org", url: Servers.Matrix},
  {name: "Cutefunny.art", url: Servers.CutefunnyArt},
  {name: "Trygve.me", url: Servers.TrygveMe},
]

export type ServerDropdownProps = {
  onServerSelected: (server: Server) => void
  className?: string
}

const ServerDropdown: FC<ServerDropdownProps> = ({
  onServerSelected,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [serverSelected, setServerSelected] = useState<string>(servers[0].name)

  return (
    <div
      className={twMerge(
        "flex max-w-xs flex-col overflow-hidden rounded-md border border-slate-300",
        className
      )}
      role="button"
      aria-hidden
      onClick={() => {
        setIsOpen(prevValue => !prevValue)
      }}>
      <div className="flex size-full items-center p-1">
        <DropdownServerItem serverName={serverSelected} />

        <div className="ml-auto text-slate-300">
          {isOpen ? <IoCaretUpOutline /> : <IoCaretDownOutline />}
        </div>
      </div>

      {isOpen && (
        <div className="flex h-max w-full flex-col border-t border-t-slate-300">
          <div className="flex flex-col">
            {servers.map(server => (
              <DropdownServerItem
                serverName={server.name}
                className="p-1 hover:bg-neutral-100"
                onClick={() => {
                  setServerSelected(server.name)
                  onServerSelected(server)
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

type DropdownServerItemProps = {
  serverName: string
  className?: string
  onClick?: () => void
}

const DropdownServerItem: FC<DropdownServerItemProps> = ({
  serverName,
  onClick,
  className,
}) => {
  return (
    <div
      role="button"
      aria-hidden
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
    </div>
  )
}

export default ServerDropdown
