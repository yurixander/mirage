import {type FC} from "react"
import {RoomSectionsHandler} from "@/containers/NavigationSection/Rooms"
import {RoomType} from "@/components/Room"

const DevelopmentPreview: FC = () => {
  return (
    <RoomSectionsHandler
      isDashboardActive
      className="max-w-64"
      sections={{
        directs: [
          {
            roomId: "room3",
            roomName: "Dormitorio principal",
            type: RoomType.Direct,
            emoji: "🛏️",
          },
        ],
        groups: [
          {
            roomId: "room1",
            roomName: "Sala de estar",
            type: RoomType.Group,
            emoji: "🛋️",
          },
          {
            roomId: "room2",
            roomName: "Cocina",
            type: RoomType.Group,
            emoji: "🍳",
          },
          {
            roomId: "room4",
            roomName: "Baño",
            type: RoomType.Group,
            emoji: "🚿",
          },
        ],
        recommended: [],
      }}
      onCreateDM={() => {}}
      onCreateRoom={() => {}}
      addRoomToSpace={function (): void {
        throw new Error("Function not implemented.")
      }}
      onSearch={function (searchType: string): void {
        throw new Error("Function not implemented.")
      }}
    />
  )
}

export default DevelopmentPreview
