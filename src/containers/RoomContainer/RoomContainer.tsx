import {type FC} from "react"
import ChatContainer from "./ChatContainer"

const RoomContainer: FC = () => {
  return (
    <div className="flex size-full flex-col">
      <div className="flex size-full">
        <ChatContainer
          className="flex size-full max-w-lg flex-col bg-blue-500"
          roomId=""
        />

        <div id="Roster" className="size-full max-w-60 bg-yellow-500" />
      </div>

      <div id="SmartActions" className="size-full max-h-4 bg-red-500" />
    </div>
  )
}

export default RoomContainer
