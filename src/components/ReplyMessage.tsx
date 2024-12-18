import {type FC} from "react"
import AvatarImage, {AvatarSize, AvatarType} from "./AvatarImage"
import TextMessage from "./TextMessage"
import {type MessageBaseData, type MessageBaseProps} from "./MessageContainer"
import {cleanDisplayName, stringToColor} from "@/utils/util"
import {Text} from "./ui/typography"
import useTooltip from "@/hooks/util/useTooltip"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ReplyMessageProps extends MessageBaseProps {
  onQuoteMessageClick: (quoteMessageId: string) => void
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
  onQuoteMessageClick,
  userId,
}) => {
  const {renderRef, showTooltip} = useTooltip<HTMLButtonElement>()

  const handleTooltip = (): void => {
    if (quotedMessageId === undefined) {
      showTooltip("Message not found", true)

      return
    }
    onQuoteMessageClick(quotedMessageId)
  }

  const quoteMessage = (
    <button
      ref={renderRef}
      onClick={handleTooltip}
      className="-mt-1 flex items-center gap-1 overflow-hidden rounded-full border bg-gray-50 p-2 px-3 text-left hover:bg-gray-100 dark:bg-neutral-950 dark:hover:bg-neutral-900">
      <AvatarImage
        avatarType={AvatarType.Message}
        displayName={quotedUserDisplayName}
        isRounded={false}
        avatarSize={AvatarSize.ExtraSmall}
        avatarUrl={quotedAvatarUrl}
      />

      <Text
        weight="bold"
        size="1"
        className="w-max shrink-0 select-text"
        style={{color: stringToColor(quotedUserDisplayName)}}>
        {cleanDisplayName(quotedUserDisplayName)}
      </Text>

      <Text size="1" className="line-clamp-1 max-w-40 shrink-0">
        {quotedText}
      </Text>
    </button>
  )

  return (
    <div className="flex flex-col">
      <div className="flex w-messageMaxWidth items-end">
        <div className="ml-5 h-4 w-8 rounded-tl border-l-2 border-t-2 border-slate-200 dark:border-slate-800" />
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger tabIndex={-1} asChild>
              {quoteMessage}
            </TooltipTrigger>

            <TooltipContent>{quotedText}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        userId={userId}
      />
    </div>
  )
}

export default ReplyMessage
