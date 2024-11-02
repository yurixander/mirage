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
import {IoReload, IoHelp, IoClose, IoChevronDown} from "react-icons/io5"
import useScrollPercent from "@/hooks/util/useScrollPercent"
import {motion} from "framer-motion"
import {SLIDE_UP_SMALL_ANIM} from "@/utils/animations"

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
  const percent = useScrollPercent(scrollContainerRef)
  const statusRef = useRef(messagesState.status)

  const canJumpToDown = percent < 85

  useEffect(() => {
    if (
      scrollContainerRef.current !== null &&
      messagesState.status === "success" &&
      messagesState.status !== statusRef.current
    ) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight
    }

    statusRef.current = messagesState.status
  }, [messagesState])

  const scrollToDown = (): void => {
    if (scrollContainerRef.current === null) {
      return
    }

    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

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

            <div className="pointer-events-none absolute bottom-0 flex w-full justify-center bg-transparent p-1">
              <div className="flex flex-col items-center gap-1">
                {/* TODO: Handle when using custom unread indicator. */}
                {/* <motion.div
                  variants={SLIDE_UP_SMALL_ANIM}
                  transition={{duration: 0.2}}
                  animate={
                    canJumpToDown && unreadMessagesIfNeeded !== null
                      ? "slideUp"
                      : "default"
                  }>
                  <Text size="1" className="w-max">
                    {unreadMessagesIfNeeded} Unread messages
                  </Text>
                </motion.div> */}

                <motion.button
                  className="pointer-events-auto flex h-8 items-center gap-1 rounded-full border border-b-2 border-neutral-500 bg-white px-3 hover:bg-neutral-50 active:scale-95 active:transition-transform dark:bg-neutral-900 hover:dark:bg-neutral-800"
                  onClick={scrollToDown}
                  variants={SLIDE_UP_SMALL_ANIM}
                  animate={canJumpToDown ? "slideUp" : "default"}
                  transition={{duration: 0.2}}>
                  <Text
                    size="2"
                    className="whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                    Jump to down
                  </Text>

                  <IoChevronDown className="text-neutral-800 dark:text-neutral-200" />
                </motion.button>
              </div>
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
