import Avatar from "boring-avatars"
import {useEffect, useRef, useState, type FC} from "react"
import Typography from "./Typography"
import {IoCaretDownOutline, IoCaretUpOutline} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import {
  CUTEFUNNYART_SERVER,
  MATRIX_SERVER,
  TRYGVEME_SERVER,
  type Server,
} from "@/utils/servers"

const servers = [MATRIX_SERVER, CUTEFUNNYART_SERVER, TRYGVEME_SERVER]

export type ServerDropdownProps = {
  onServerSelected: (server: Server) => void
  className?: string
}

const ServerDropdown: FC<ServerDropdownProps> = ({
  onServerSelected,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [serverSelected, setServerSelected] = useState(MATRIX_SERVER)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof Node && dropdownRef.current?.contains(e.target)) {
      return
    }

    setIsOpen(false)
  }

  useEffect(() => {
    const EVENT = "click"

    document.addEventListener(EVENT, handleClickOutside, true)

    return () => {
      document.addEventListener(EVENT, handleClickOutside, true)
    }
  })

  return (
    <>
      <div
        ref={dropdownRef}
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
          <DropdownServerItem serverName={serverSelected.name} />

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
                    setServerSelected(server)
                    onServerSelected(server)
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
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
