import EventMessage from "@/components/EventMessage"
import {type FC} from "react"
import {IoSettings} from "react-icons/io5"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <EventMessage
        icon={IoSettings}
        body="has change avatar url"
        eventId="event:test"
        timestamp={Date.now()}
        sender={{displayName: "Emerald branch", userId: "@emerald_branch"}}
        onFindUser={() => {}}
        onShowMember={() => {}}
      />
    </>
  )
}

export default DevelopmentPreview
