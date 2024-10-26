import {type FC} from "react"
import MessageContainer, {
  type MessageBaseData,
  type MessageBaseProps,
} from "./MessageContainer"
import {assert, CommonAssertion} from "@/utils/util"
import {Text} from "./ui/typography"
import {MessageContextMenu} from "./ui/context-menu"

export interface TextMessageData extends MessageBaseData {
  text: string
}

export interface TextMessageProps extends MessageBaseProps, TextMessageData {}

const TextMessage: FC<TextMessageProps> = ({
  authorAvatarUrl,
  authorDisplayName,
  authorDisplayNameColor,
  onAuthorClick,
  text,
  timestamp,
  contextMenuItems,
  messageId,
  userId,
}) => {
  assert(text.length > 0, "Text message text should not be empty.")
  assert(messageId.length > 0, CommonAssertion.MessageIdEmpty)

  return (
    <MessageContainer
      authorDisplayName={authorDisplayName}
      authorDisplayNameColor={authorDisplayNameColor}
      authorAvatarUrl={authorAvatarUrl}
      timestamp={timestamp}
      onAuthorClick={onAuthorClick}
      userId={userId}>
      <MessageContextMenu items={contextMenuItems}>
        <Text className="max-w-messageMaxWidth cursor-text select-text break-words">
          {text.split(/(\n)/).map(line => (line === "\n" ? <br /> : line))}
        </Text>
      </MessageContextMenu>
    </MessageContainer>
  )
}

export default TextMessage
