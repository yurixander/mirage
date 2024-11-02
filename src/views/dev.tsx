import {ChatMessages} from "@/containers/RoomContainer/ChatMessages"
import {
  type AnyMessage,
  MessageKind,
} from "@/containers/RoomContainer/hooks/useRoomChat"
import useValueState from "@/hooks/util/useValueState"
import {DUMMY_MESSAGE_TEXT} from "@/stories/Chat/textMessage.stories"
import {delay} from "@/utils/util"
import {useEffect, type FC} from "react"

const TEST: AnyMessage = {
  kind: MessageKind.Text,
  data: DUMMY_MESSAGE_TEXT,
  messageId: "message-id-1",
}

const DevelopmentPreview: FC = () => {
  const [state, setState] = useValueState<AnyMessage[]>()

  useEffect(() => {
    void delay(1000).then(() => {
      const list: AnyMessage[] = Array.from({length: 47}).map((_, i) => {
        return {...TEST, messageId: `mes ${i}`}
      })

      setState({status: "success", data: list})
    })
  }, [setState])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <ChatMessages
        className="max-w-2xl py-10"
        messagesState={state}
        onReloadMessages={() => {}}
        onCloseRoom={() => {}}
      />
    </div>
  )
}

export default DevelopmentPreview
