import EventGroupMessage, {
  EventShortenerType,
} from "@/components/EventGroupMessage"
import {type EventMessageData} from "@/components/EventMessage"
import {type FC} from "react"

const event: EventMessageData = {
  body: "Ha cambiado su nombre a",
  eventId: "id-1",
  sender: {
    displayName: "Emerald Branch",
    userId: "@emerald_branch",
  },
  timestamp: Date.now(),
  type: "",
}

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="m-1">
        <EventGroupMessage
          onShowMember={function (): void {
            throw new Error("Function not implemented.")
          }}
          onFindUser={function (): void {
            throw new Error("Function not implemented.")
          }}
          eventGroupMainBody={{
            sender: {
              displayName: "Emerald Branch",
              userId: "@emerald_branch",
            },
            shortenerType: EventShortenerType.EqualInfo,
          }}
          eventMessages={[event, event, event, event]}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
