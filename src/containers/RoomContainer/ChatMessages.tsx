import {type FC, useEffect, useRef} from "react"
import {twMerge} from "tailwind-merge"
import {type AnyMessage} from "./hooks/useRoomChat"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "@/components/ui/typography"
import {ScrollArea} from "@/components/ui/scroll-area"
import {type ValueState} from "@/hooks/util/useValueState"
import ValueStateHandler from "@/components/ValueStateHandler"
import AnyMessageHandler from "./AnyMessageHandler"

export type ChatMessagesProps = {
  messagesState: ValueState<AnyMessage[]>
  className?: string
}

export const ChatMessages: FC<ChatMessagesProps> = ({
  messagesState,
  className,
}) => {
  const {t} = useTranslation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current && messagesState.status === "success") {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight
    }
  }, [messagesState])

  return (
    <div className={twMerge("flex size-full flex-col gap-4", className)}>
      <ValueStateHandler
        value={messagesState}
        loading={
          // TODO: @lazaroysr96 Dark mode and limit height for MessagesPlaceholder.
          // <MessagesPlaceholder />
          <></>
        }
        error={_error => (
          <ChatMessageTemplate
            title={t(LangKey.MessagesError)}
            subtitle={t(LangKey.MessagesErrorSubtitle)}
          />
        )}>
        {messages => (
          <ScrollArea avoidOverflow ref={scrollContainerRef}>
            <div className="flex-1 space-y-4">
              {messages.map((message, index) => (
                <AnyMessageHandler
                  key={message.messageId}
                  isAtTheEnd={index !== messages.length - 1}
                  anyMessage={message}
                  onAuthorClick={(_userId: string) => {
                    throw new Error("Author click function not implemented.")
                  }}
                  onClickImage={(_imgUrl: string) => {
                    throw new Error("Click image function not implemented.")
                  }}
                  onResendMessage={() => {
                    throw new Error("Resend message function not implemented.")
                  }}
                  onReplyMessage={() => {
                    throw new Error("Reply message function not implemented.")
                  }}
                  onDeleteMessage={() => {
                    throw new Error("Delete message function not implemented.")
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </ValueStateHandler>
    </div>
  )
}

const ChatMessageTemplate: FC<{title: string; subtitle: string}> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Heading level="h2">{title}</Heading>

      <Text>{subtitle}</Text>
    </div>
  )
}
