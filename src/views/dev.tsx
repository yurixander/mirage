import {type FC} from "react"
import EventGroupMessage, {
  EventShortenerType,
} from "../components/EventGroupMessage"
import {DummyEvents} from "@/stories/Chat/eventGroupMessage.stories"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="m-4">
        <EventGroupMessage
          onFindUser={() => {}}
          onShowMember={() => {}}
          eventMessages={DummyEvents}
          eventGroupMainBody={{
            sender: {
              displayName: "Sapphire Pineapple",
              userId: "@sapphire_pineapple",
            },
            shortenerType: EventShortenerType.ConfigureRoom,
          }}
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
