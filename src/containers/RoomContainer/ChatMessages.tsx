import {type FC, useEffect, useRef, useState} from "react"
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
} from "@/components/ui/alert-dialog"
import {IoReload, IoHelp, IoClose, IoChevronDown} from "react-icons/io5"
import useScrollPercent from "@/hooks/util/useScrollPercent"
import {motion} from "framer-motion"
import {SLIDE_UP_SMALL_ANIM} from "@/utils/animations"
import UnreadIndicator from "@/components/UnreadIndicator"
import MessagesPlaceholder from "./MessagesPlaceholder"

const MIN_PERCENT_FOR_JUMP = 99.5

export type ChatMessagesProps = {
  messagesState: ValueState<AnyMessage[]>
  lastMessageReadId: string | null
  onLastMessageReadIdChange: (messageId: string | null) => void
  onReloadMessages: () => void
  onCloseRoom: () => void
}

export const ChatMessages: FC<ChatMessagesProps> = ({
  messagesState,
  lastMessageReadId,
  onCloseRoom,
  onLastMessageReadIdChange,
  onReloadMessages,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const unreadIndicatorRef = useRef<HTMLDivElement>(null)

  const percent = useScrollPercent(scrollContainerRef)
  const beforeStatusRef = useRef(messagesState.status)

  const internalLastMessageIdRef = useRef<string | null>(null)

  // Scroll down when messages status has changed.
  useEffect(() => {
    if (
      scrollContainerRef.current !== null &&
      messagesState.status === "success" &&
      messagesState.status !== beforeStatusRef.current
    ) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight
    }

    beforeStatusRef.current = messagesState.status
  }, [messagesState])

  // Remove unread indicator after 10 seconds.
  useEffect(() => {
    if (messagesState.status !== "success") {
      return
    }

    if (lastMessageReadId === null) {
      unreadIndicatorRef.current?.remove()

      return
    }

    const timeoutId = setTimeout(() => {
      if (unreadIndicatorRef.current === null) {
        return
      }

      onLastMessageReadIdChange(null)
    }, 8000)

    return () => clearTimeout(timeoutId)
  }, [lastMessageReadId, messagesState, onLastMessageReadIdChange])

  // Put or actualize the unread indicator location.
  useEffect(() => {
    if (
      messagesState.status !== "success" ||
      percent > MIN_PERCENT_FOR_JUMP ||
      internalLastMessageIdRef.current === messagesState.data.at(-1)?.messageId
    ) {
      return
    }

    const cachedLastMessageId = messagesState.data.at(-1)?.messageId

    if (cachedLastMessageId === undefined) {
      return
    }

    internalLastMessageIdRef.current = cachedLastMessageId

    // If there is already unread indicator do nothing.
    if (lastMessageReadId !== null) {
      return
    }

    onLastMessageReadIdChange(cachedLastMessageId)
  }, [lastMessageReadId, messagesState, onLastMessageReadIdChange, percent])

  return (
    <div className="relative flex grow basis-0 overflow-y-auto">
      <ValueStateHandler
        value={messagesState}
        error={error => (
          <MessagesError
            error={error}
            onReloadMessages={onReloadMessages}
            onCloseRoom={onCloseRoom}
          />
        )}
        loading={<MessagesPlaceholder />}>
        {messages => (
          <ScrollArea avoidOverflow ref={scrollContainerRef}>
            <div className="flex-1 space-y-4 p-4">
              {messages.map((message, index) => (
                <div key={message.messageId}>
                  <AnyMessageHandler
                    anyMessage={message}
                    onAuthorClick={(_userId: string) => {
                      throw new Error("Author click function not implemented.")
                    }}
                    onClickImage={(_imgUrl: string) => {
                      throw new Error("Click image function not implemented.")
                    }}
                    onResendMessage={() => {
                      throw new Error(
                        "Resend message function not implemented."
                      )
                    }}
                    onReplyMessage={() => {
                      throw new Error("Reply message function not implemented.")
                    }}
                    onDeleteMessage={() => {
                      throw new Error(
                        "Delete message function not implemented."
                      )
                    }}
                  />

                  {message.messageId === lastMessageReadId &&
                    index !== messages.length - 1 && (
                      <UnreadIndicator ref={unreadIndicatorRef} />
                    )}
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute bottom-4 z-50 flex w-full justify-center bg-transparent p-1">
              <div className="flex flex-col items-center gap-1">
                <UnreadMessagesCountPopup
                  percent={percent}
                  messagesState={messagesState}
                />

                <JumpToDownAction
                  percent={percent}
                  scrollToDown={() => {
                    if (scrollContainerRef.current === null) {
                      return
                    }

                    scrollContainerRef.current.scrollTo({
                      top: scrollContainerRef.current.scrollHeight,
                      behavior: "smooth",
                    })
                  }}
                />
              </div>
            </div>
          </ScrollArea>
        )}
      </ValueStateHandler>
    </div>
  )
}

type UnreadMessagesCountProps = {
  percent: number
  messagesState: ValueState<AnyMessage[]>
}

const UnreadMessagesCountPopup: FC<UnreadMessagesCountProps> = ({
  percent,
  messagesState,
}) => {
  const {t} = useTranslation()
  const beforeLengthRef = useRef<number | null>(null)
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0)

  useEffect(() => {
    if (messagesState.status !== "success") {
      beforeLengthRef.current = null
      setUnreadMessagesCount(0)

      return
    }

    if (beforeLengthRef.current === null) {
      beforeLengthRef.current = messagesState.data.length
      setUnreadMessagesCount(0)

      return
    }

    if (beforeLengthRef.current > messagesState.data.length) {
      setUnreadMessagesCount(0)
      beforeLengthRef.current = messagesState.data.length

      return
    }

    setUnreadMessagesCount(messagesState.data.length - beforeLengthRef.current)
    beforeLengthRef.current = messagesState.data.length
  }, [messagesState])

  useEffect(() => {
    if (percent > MIN_PERCENT_FOR_JUMP) {
      setUnreadMessagesCount(0)
    }
  }, [percent])

  return (
    <motion.div
      variants={SLIDE_UP_SMALL_ANIM}
      transition={{duration: 0.2}}
      animate={
        percent < MIN_PERCENT_FOR_JUMP && unreadMessagesCount > 0
          ? "slideUp"
          : "default"
      }>
      <Text size="1" className="w-max">
        {t(LangKey.UnreadMessagesCount, unreadMessagesCount.toString())}
      </Text>
    </motion.div>
  )
}

type JumpToDownActionProps = {
  percent: number
  scrollToDown: () => void
}

const JumpToDownAction: FC<JumpToDownActionProps> = ({
  percent,
  scrollToDown,
}) => {
  const {t} = useTranslation()

  return (
    <motion.button
      className="pointer-events-auto flex h-8 items-center gap-1 rounded-full border border-b-2 border-neutral-500 bg-white px-3 hover:bg-neutral-50 active:scale-95 active:transition-transform dark:bg-neutral-900 hover:dark:bg-neutral-800"
      onClick={scrollToDown}
      variants={SLIDE_UP_SMALL_ANIM}
      animate={percent < MIN_PERCENT_FOR_JUMP ? "slideUp" : "default"}
      transition={{duration: 0.2}}
      aria-label={t(LangKey.JumpToDown)}>
      <Text
        size="2"
        className="whitespace-nowrap text-neutral-800 dark:text-neutral-200">
        {t(LangKey.JumpToDown)}
      </Text>

      <IoChevronDown className="text-neutral-800 dark:text-neutral-200" />
    </motion.button>
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
    <div className="flex size-full items-center justify-center">
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
    </div>
  )
}
