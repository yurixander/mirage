import {ChatMessages} from "@/containers/RoomContainer/ChatMessages"
import {
  type AnyMessage,
  MessageKind,
} from "@/containers/RoomContainer/hooks/useRoomChat"
import useValueState from "@/hooks/util/useValueState"
import {DUMMY_MESSAGE_TEXT} from "@/stories/Chat/textMessage.stories"
import {delay} from "@/utils/util"
import {useEffect, useState, type FC} from "react"

const TEST: AnyMessage = {
  kind: MessageKind.Text,
  data: DUMMY_MESSAGE_TEXT,
  messageId: "message-id-1",
}

const DevelopmentPreview: FC = () => {
  const [state, setState] = useValueState<AnyMessage[]>()

  const [lastMessageReadId, setLastMessageReadId] = useState<string | null>(
    "mes 44"
  )

  useEffect(() => {
    void delay(1000).then(() => {
      const list: AnyMessage[] = Array.from({length: 47}).map((_, i) => {
        return {...TEST, messageId: `mes ${i}`}
      })

      setState({status: "success", data: list})
    })
  }, [setState])

  useEffect(() => {
    void delay(4000).then(() => {
      setState(prev => {
        if (prev.status === "success") {
          return {
            status: "success",
            data: prev.data.concat([{...TEST, messageId: "mes 49"}]),
          }
        }

        return prev
      })
    })
  }, [setState])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <ChatMessages
        className="max-w-2xl py-10"
        lastMessageReadId={lastMessageReadId}
        messagesState={state}
        onReloadMessages={() => {}}
        onCloseRoom={() => {}}
        onLastMessageReadIdChange={setLastMessageReadId}
      />
    </div>
  )
}

export default DevelopmentPreview
