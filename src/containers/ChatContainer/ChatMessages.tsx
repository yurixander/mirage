import EventMessage from "@/components/EventMessage"
import ImageMessage from "@/components/ImageMessage"
import TextMessage from "@/components/TextMessage"
import Typography, {TypographyVariant} from "@/components/Typography"
import UnreadIndicator from "@/components/UnreadIndicator"
import {
  type AnyMessage,
  MessagesState,
  MessageKind,
} from "@/hooks/matrix/useActiveRoom"
import {type FC, useEffect, useMemo, useRef} from "react"
import MessagesPlaceholder from "./MessagesPlaceholder"
import {assert} from "@/utils/util"
import {twMerge} from "tailwind-merge"

export type ChatMessagesProps = {
  messages: AnyMessage[]
  messagesState: MessagesState
  className?: string
}

export const ChatMessages: FC<ChatMessagesProps> = ({
  messages,
  messagesState,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (messagesState === MessagesState.Loaded) {
    assert(
      messages.length > 0,
      "If you have no messages, your status should be NotMessages."
    )
  }

  const messageElements = useMemo(
    () =>
      messages.map(message =>
        message.kind === MessageKind.Text ? (
          <TextMessage key={message.data.id} {...message.data} />
        ) : message.kind === MessageKind.Image ? (
          <ImageMessage key={message.data.id} {...message.data} />
        ) : message.kind === MessageKind.Event ? (
          <EventMessage key={message.data.id} {...message.data} />
        ) : (
          <UnreadIndicator key="unread-indicator" {...message.data} />
        )
      ),
    [messages]
  )

  useEffect(() => {
    if (!scrollRef.current) {
      return
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  return (
    <div
      ref={scrollRef}
      className={twMerge(
        "flex size-full max-h-[450px] flex-col gap-4 overflow-y-auto scroll-smooth p-2 scrollbar-hide",
        className
      )}>
      {messagesState === MessagesState.Loaded ? (
        messageElements
      ) : messagesState === MessagesState.Loading ? (
        <MessagesPlaceholder />
      ) : messagesState === MessagesState.Error ? (
        <ChatMessageTemplate
          title="Messages Error"
          subtitle="An error occurred when obtaining messages from this room."
        />
      ) : (
        <ChatMessageTemplate
          title="No Messages"
          subtitle="Is this room new or has no messages."
        />
      )}
    </div>
  )
}

const ChatMessageTemplate: FC<{title: string; subtitle: string}> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Typography variant={TypographyVariant.HeadingLarge}>{title}</Typography>

      <Typography>{subtitle}</Typography>
    </div>
  )
}
