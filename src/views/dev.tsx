import TextMessage from "@/components/TextMessage"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="m-1">
        <TextMessage
          contextMenuItems={[]}
          onAuthorClick={function (userId: string): void {
            throw new Error("Function not implemented.")
          }}
          userId="@emerald_branch"
          authorDisplayName="Emerald Branch"
          timestamp={Date.now()}
          messageId="message-test-id"
          text="This is a test message for view the preview of the message."
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
