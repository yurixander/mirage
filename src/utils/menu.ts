import {IoMdDownload, IoMdTrash} from "react-icons/io"
import {IoArrowUndo, IoArrowRedo} from "react-icons/io5"
import {assert} from "./util"
import {t} from "./lang"
import {LangKey} from "@/lang/allKeys"
import {MessageMenuItem} from "@/components/ui/context-menu"

export type BuildMessageTemplate = {
  canDeleteMessage: boolean
  isSaveable?: boolean
  isMessageError?: boolean
  onDeleteMessage?: () => void
  onResendMessage?: () => void
  onReplyMessage?: () => void
  onSaveContent?: () => void
}

export function buildMessageMenuItems({
  canDeleteMessage = false,
  isMessageError = false,
  isSaveable = false,
  onDeleteMessage,
  onReplyMessage,
  onResendMessage,
  onSaveContent,
}: BuildMessageTemplate): MessageMenuItem[] {
  const menuItems: MessageMenuItem[] = []

  // If is a message error, should not have context items.
  if (isMessageError) {
    return []
  }

  if (isSaveable) {
    assert(
      onSaveContent !== undefined,
      "If the content can be saved `onSaveContent` should not be undefined."
    )

    menuItems.push({
      text: t(LangKey.Save),
      icon: IoMdDownload,
      onClick: onSaveContent,
    })
  }

  assert(
    onResendMessage !== undefined && onReplyMessage !== undefined,
    "If the message has no errors, it must be possible to forward and respond."
  )

  menuItems.push(
    {
      text: t(LangKey.Resend),
      icon: IoArrowRedo,
      onClick: onResendMessage,
    },
    {
      text: t(LangKey.Reply),
      icon: IoArrowUndo,
      onClick: onReplyMessage,
    }
  )

  if (canDeleteMessage) {
    assert(
      onDeleteMessage !== undefined,
      "If current user can delete message then `onDeleteMessage` should not be undefined."
    )

    menuItems.push({
      text: t(LangKey.Delete),
      icon: IoMdTrash,
      onClick: onDeleteMessage,
      isDestructive: true,
    })
  }

  return menuItems
}
