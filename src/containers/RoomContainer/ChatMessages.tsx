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
import {AlertDialogFooter} from "@/components/ui/alert-dialog"
import {IconButton} from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog"
import {IoReload, IoHelp, IoClose} from "react-icons/io5"

export type ChatMessagesProps = {
  messagesState: ValueState<AnyMessage[]>
  onReloadMessages: () => void
  onCloseRoom: () => void
  className?: string
}

export const ChatMessages: FC<ChatMessagesProps> = ({
  messagesState,
  onCloseRoom,
  onReloadMessages,
  className,
}) => {
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
        error={error => (
          <MessagesError
            error={error}
            onReloadMessages={onReloadMessages}
            onCloseRoom={onCloseRoom}
          />
        )}
        loading={
          // TODO: @lazaroysr96 Dark mode and limit height for MessagesPlaceholder.
          // <MessagesPlaceholder />
          <></>
        }>
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

type MessagesErrorProps = {
  error: Error
  onReloadMessages: () => void
  onCloseRoom: () => void
}

const MessagesError: FC<MessagesErrorProps> = ({
  error,
  onReloadMessages,
  onCloseRoom,
}) => {
  const {t} = useTranslation()

  return (
    <div className="flex h-72 w-auto flex-col items-center justify-center gap-2 px-2 sm:size-96 sm:px-0">
      <div className="flex flex-col rounded-md bg-red-200 px-2 dark:bg-red-800">
        <Heading
          level="h2"
          align="center"
          className="text-red-800 dark:text-red-200">
          {t(LangKey.MessagesError)}
        </Heading>

        <Text align="center" className="text-red-800 dark:text-red-200">
          {t(LangKey.MessagesErrorSubtitle)}
        </Text>
      </div>

      <div className="flex w-full justify-end gap-2">
        <div className="flex">
          <IconButton
            aria-label={t(LangKey.ReloadMembers)}
            tooltip={t(LangKey.ReloadMembers)}
            onClick={onReloadMessages}>
            <IoReload size={18} />
          </IconButton>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <IconButton
                aria-label={t(LangKey.MoreErrorInformation)}
                tooltip={t(LangKey.MoreErrorInformation)}>
                <IoHelp size={18} />
              </IconButton>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogTitle asChild>
                <Heading level="h3">{t(LangKey.HelpInfoError)}</Heading>
              </AlertDialogTitle>

              <AlertDialogDescription>{error.message}</AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogAction>{t(LangKey.Accept)}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <IconButton
            aria-label={t(LangKey.CloseRoom)}
            tooltip={t(LangKey.CloseRoom)}
            onClick={onCloseRoom}>
            <IoClose size={18} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
