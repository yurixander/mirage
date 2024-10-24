import TextMessage from "@/components/TextMessage"
import {CONTEXT_MENU_RESEND} from "@/utils/menu"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  return (
    <>
      <div className="m-1">
        <TextMessage
          text="Some think about this"
          contextMenuItems={[{...CONTEXT_MENU_RESEND, onClick() {}}]}
          onAuthorClick={function (userId: string): void {
            throw new Error("Function not implemented.")
          }}
          userId="@emerald_branch"
          authorDisplayName="Emerald Branch"
          timestamp={Date.now()}
          messageId="message-test-id"
        />
      </div>
    </>
  )
}

export default DevelopmentPreview
