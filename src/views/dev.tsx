import DMTrayPopup, {
  type DMUser,
} from "@/containers/NavigationSection/DMTrayPopup"
import {type FC} from "react"

// TODO: Organize this and create preview for storybook.

const searchResult: DMUser[] = [
  {displayName: "Arturo", userId: "@arthuro"},
  {displayName: "Arturo", userId: "@arthuro"},
  {displayName: "Arturo", userId: "@arthuro"},
  {displayName: "Arturo", userId: "@arthuro"},
]

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="flex size-full items-end justify-center">
        <DMTrayPopup
          isLoading={false}
          dmRooms={[
            {
              partnerId: "@arthurxxl",
              partnerName: "Arturo",
              roomId: "room-text",
            },
          ]}
          searchResult={searchResult}
          dmRoomClick={function (roomId: string): void {
            throw new Error("Function not implemented.")
          }}
          onResultUserClick={function (userId: string): void {
            throw new Error("Function not implemented.")
          }}
          userId={"crissxxl"}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
