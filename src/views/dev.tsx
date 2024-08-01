import EventMessage from "@/components/EventMessage"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <EventMessage
        body="has change avatar url"
        eventId="event:test"
        timestamp={Date.now()}
        sender={{displayName: "Emerald branch", userId: "@emerald_branch"}}
      />
    </>
  )
}

export default DevelopmentPreview
