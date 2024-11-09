import AudioMessage from "@/components/AudioMessage"
import EventGroupMessage from "@/components/EventGroupMessage"
import EventMessage from "@/components/EventMessage"
import FileMessage from "@/components/FileMessage"
import ImageMessage from "@/components/ImageMessage"
import ReplyMessage from "@/components/ReplyMessage"
import TextMessage from "@/components/TextMessage"
import VideoMessage from "@/components/VideoMessage"
import {type FC} from "react"
import {type AnyMessage, MessageKind} from "./hooks/useRoomChat"
import {buildMessageMenuItems} from "@/utils/menu"

type AnyMessageHandlerProps = {
  anyMessage: AnyMessage
  onAuthorClick: (userId: string) => void
  onClickImage: (imgUrl: string) => void
  onResendMessage: () => void
  onReplyMessage: () => void
  onDeleteMessage: () => void
}

const AnyMessageHandler: FC<AnyMessageHandlerProps> = ({
  anyMessage,
  onAuthorClick,
  onResendMessage,
  onDeleteMessage,
  onReplyMessage,
  onClickImage,
}) => {
  switch (anyMessage.kind) {
    case MessageKind.Text: {
      return (
        <TextMessage
          {...anyMessage.data}
          onAuthorClick={onAuthorClick}
          contextMenuItems={buildMessageMenuItems({
            isMessageError: anyMessage.data.isDeleted === true,
            canDeleteMessage: anyMessage.data.canDeleteMessage === true,
            onReplyMessage,
            onResendMessage,
            onDeleteMessage,
          })}
        />
      )
    }
    case MessageKind.Image: {
      return (
        <ImageMessage
          {...anyMessage.data}
          onClickImage={onClickImage}
          onAuthorClick={onAuthorClick}
          contextMenuItems={buildMessageMenuItems({
            canDeleteMessage: anyMessage.data.canDeleteMessage === true,
            isMessageError: false,
            isSaveable: true,
            onReplyMessage,
            onResendMessage,
            onSaveContent() {
              open(anyMessage.data.imageUrl)
            },
            onDeleteMessage,
          })}
        />
      )
    }
    case MessageKind.Audio: {
      return (
        <AudioMessage
          onAuthorClick={onAuthorClick}
          {...anyMessage.data}
          contextMenuItems={[]}
        />
      )
    }
    case MessageKind.Event: {
      return (
        <EventMessage
          {...anyMessage.data}
          onShowMember={() => {
            // TODO: Handle show member here.
          }}
        />
      )
    }
    case MessageKind.File: {
      return (
        <FileMessage
          {...anyMessage.data}
          onAuthorClick={onAuthorClick}
          contextMenuItems={buildMessageMenuItems({
            isMessageError: anyMessage.data.isDeleted === true,
            canDeleteMessage: anyMessage.data.canDeleteMessage === true,
            onReplyMessage,
            onResendMessage,
            onDeleteMessage,
          })}
        />
      )
    }
    case MessageKind.Reply: {
      return (
        <ReplyMessage
          {...anyMessage.data}
          onAuthorClick={onAuthorClick}
          onQuoteMessageClick={_quoteMessageId => {
            // TODO Handle `onQuoteMessageClick` for `ReplyMessage`
          }}
          contextMenuItems={buildMessageMenuItems({
            isMessageError: anyMessage.data.isDeleted === true,
            canDeleteMessage: anyMessage.data.canDeleteMessage === true,
            onReplyMessage,
            onResendMessage,
            onDeleteMessage,
          })}
        />
      )
    }
    case MessageKind.EventGroup: {
      return (
        <EventGroupMessage
          eventGroupMainBody={anyMessage.data.eventGroupMainBody}
          eventMessages={anyMessage.data.eventMessages}
          onShowMember={function (): void {
            throw new Error("Show member not implemented.")
          }}
        />
      )
    }
    case MessageKind.Video: {
      return (
        <VideoMessage
          {...anyMessage.data}
          onAuthorClick={onAuthorClick}
          url={anyMessage.data.url}
          contextMenuItems={[]}
        />
      )
    }
  }
}

export default AnyMessageHandler
