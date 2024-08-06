import {type FC} from "react"
import AvatarImage, {AvatarSize, AvatarType} from "./AvatarImage"
import TextMessage from "./TextMessage"
import Typography, {TypographyVariant} from "./Typography"
import {type MessageBaseProps} from "./MessageContainer"
import {cleanDisplayName} from "@/utils/util"

export interface ReplyMessageProps extends MessageBaseProps {
  fromMessage: MessageBaseProps
  onFromMessageClick: () => void
}

const ReplyMessage: FC<ReplyMessageProps> = ({
  fromMessage,
  authorDisplayName,
  authorDisplayNameColor,
  contextMenuItems,
  id,
  onAuthorClick,
  text,
  timestamp,
  authorAvatarUrl,
  onFromMessageClick,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-messageMaxWidth items-end">
        <div className="ml-5 h-4 w-8 rounded-tl border-l-2 border-t-2 border-slate-200" />
        <button
          onClick={onFromMessageClick}
          className="-mt-1 flex items-center gap-1 overflow-hidden rounded-lg bg-gray-50 p-2 px-3 text-left hover:bg-gray-100">
          <AvatarImage
            avatarType={AvatarType.Message}
            displayName={fromMessage.authorDisplayName}
            isRounded={false}
            avatarSize={AvatarSize.ExtraSmall}
            avatarUrl={fromMessage.authorAvatarUrl}
          />

          <Typography
            className="w-max shrink-0 select-text font-bold"
            style={{color: fromMessage.authorDisplayNameColor}}
            onClick={fromMessage.onAuthorClick}
            variant={TypographyVariant.BodySmall}>
            {cleanDisplayName(fromMessage.authorDisplayName)}
          </Typography>

          <Typography
            className="shrink-0"
            variant={TypographyVariant.BodySmall}>
            {fromMessage.text.slice(0, 50)}
          </Typography>
        </button>
      </div>

      <TextMessage
        authorDisplayName={authorDisplayName}
        authorDisplayNameColor={authorDisplayNameColor}
        contextMenuItems={contextMenuItems}
        id={id}
        onAuthorClick={onAuthorClick}
        text={text}
        timestamp={timestamp}
        authorAvatarUrl={authorAvatarUrl}
      />
    </div>
  )
}

export default ReplyMessage
