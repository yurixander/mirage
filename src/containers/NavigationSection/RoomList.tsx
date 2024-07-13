import {type FC} from "react"

export type RoomListProps = {
  spaceId?: string
  className?: string
}

const RoomList: FC<RoomListProps> = ({spaceId, className}) => {
  return <div id="room-list" className={className}></div>
}

export default RoomList
