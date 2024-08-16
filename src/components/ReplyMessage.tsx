import {type FC} from "react"
import AvatarImage, {AvatarSize, AvatarType} from "./AvatarImage"
import TextMessage from "./TextMessage"
import Typography, {TypographyVariant} from "./Typography"
import {type MessageBaseData, type MessageBaseProps} from "./MessageContainer"
import {cleanDisplayName, stringToColor} from "@/utils/util"

export interface ReplyMessageProps extends MessageBaseProps {
  text: string
  quotedText: string
  quotedUserDisplayName: string
  quotedMessageId?: string
  quotedAvatarUrl?: string
}

export interface ReplyMessageData extends MessageBaseData {
  text: string
  quotedText: string
  quotedUserDisplayName: string
  quotedMessageId?: string
  quotedAvatarUrl?: string
}

const ReplyMessage: FC<ReplyMessageProps> = ({
  authorDisplayName,
  authorDisplayNameColor,
  contextMenuItems,
  messageId,
  onAuthorClick,
  text,
  timestamp,
  authorAvatarUrl,
  quotedMessageId,
  quotedText,
  quotedUserDisplayName,
  quotedAvatarUrl,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-messageMaxWidth items-end">
        <div className="ml-5 h-4 w-8 rounded-tl border-l-2 border-t-2 border-slate-200" />
        <button
          onClick={() => {
            // TODO: function to skip to the message being answered
          }}
          className="-mt-1 flex items-center gap-1 overflow-hidden rounded-full border bg-gray-50 p-2 px-3 text-left hover:bg-gray-100">
          <AvatarImage
            avatarType={AvatarType.Message}
            displayName={quotedUserDisplayName}
            isRounded={false}
            avatarSize={AvatarSize.ExtraSmall}
            avatarUrl={quotedAvatarUrl}
          />

          <Typography
            className="w-max shrink-0 select-text font-bold"
            style={{color: stringToColor(quotedUserDisplayName)}}
            variant={TypographyVariant.BodySmall}>
            {cleanDisplayName(quotedUserDisplayName)}
          </Typography>

          <Typography
            className="line-clamp-1 max-w-40 shrink-0"
            variant={TypographyVariant.BodySmall}>
            {quotedText}
          </Typography>
        </button>
      </div>

      <TextMessage
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={authorDisplayNameColor}
        contextMenuItems={contextMenuItems}
        messageId={messageId}
        onAuthorClick={onAuthorClick}
        text={text}
        timestamp={timestamp}
        authorAvatarUrl={authorAvatarUrl}
      />
    </div>
  )
}

export default ReplyMessage
