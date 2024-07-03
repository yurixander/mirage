import {type FC} from "react"

const RoomContainer: FC = () => {
  return (
    <div className="flex size-full">
      <div className="flex size-full max-w-lg flex-col">
        <div id="ChatContainer" className="flex size-full flex-col bg-blue-500">
          <div id="ChatHeader" className="size-full max-h-10 bg-green-500" />

          <div
            id="MessageList"
            className="size-full max-h-[450px] shrink-0 bg-slate-500"
          />

          <div
            id="ChatInput"
            className="size-full max-h-14 shrink-0 bg-black"
          />

          <div
            id="Typing Users"
            className="size-full max-h-12 bg-fuchsia-500"
          />
        </div>

        <div id="SmartActions" className="size-full max-h-4 bg-red-500" />
      </div>

      <div id="Roster" className="size-full max-w-60 bg-yellow-500" />
    </div>
  )
}

export default RoomContainer
