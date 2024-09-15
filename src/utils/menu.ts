import {type ContextMenuItem} from "@/components/ContextMenu"
import {IoMdDownload, IoMdTrash, IoIosSettings} from "react-icons/io"
import {
  IoArrowUndo,
  IoArrowRedo,
  IoReloadCircle,
  IoAddCircle,
  IoSearchCircle,
} from "react-icons/io5"
import {assert} from "./util"
import {MdPlaylistAddCircle} from "react-icons/md"
import {t} from "./lang"
import {LangKey} from "@/lang/allKeys"

export const CONTEXT_MENU_REPLY = {
  text: t(LangKey.Reply),
  icon: IoArrowUndo,
}

export const CONTEXT_MENU_RESEND = {
  text: t(LangKey.Resend),
  icon: IoArrowRedo,
}

export const CONTEXT_MENU_SAVE = {
  text: t(LangKey.Save),
  icon: IoMdDownload,
}

export const CONTEXT_MENU_DELETE = {
  text: t(LangKey.Delete),
  icon: IoMdTrash,
  color: "red",
}

export const CONTEXT_MENU_SETTINGS = {
  text: t(LangKey.Settings),
  icon: IoIosSettings,
}

export const CONTEXT_MENU_RELOAD = {
  text: t(LangKey.Reload),
  icon: IoReloadCircle,
}

export const CONTEXT_MENU_ADD = {
  text: t(LangKey.Add),
  icon: IoAddCircle,
}

export const CONTEXT_MENU_SEARCH = {
  text: t(LangKey.Search),
  icon: IoSearchCircle,
}

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
}: BuildMessageTemplate): ContextMenuItem[] {
  const menuItems: ContextMenuItem[] = []

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
      color: "red",
      onClick: onDeleteMessage,
    })
  }

  return menuItems
}

export type BuildRoomsTemplate = {
  isHome?: boolean
  onCreateRoom: () => void
  searchPublicRooms: () => void
  searchPublicSpaces: () => void
  addRoomToSpace?: () => void
}

export function buildRoomsMenuItems({
  isHome = false,
  onCreateRoom,
  searchPublicRooms,
  searchPublicSpaces,
  addRoomToSpace,
}: BuildRoomsTemplate): ContextMenuItem[] {
  const menuItems: ContextMenuItem[] = [
    {
      icon: IoAddCircle,
      text: t(LangKey.CreateRoom),
      onClick: onCreateRoom,
    },
    {
      icon: IoSearchCircle,
      text: t(LangKey.SearchRooms),
      onClick: searchPublicRooms,
    },
    {
      icon: IoSearchCircle,
      text: t(LangKey.SearchSpaces),
      onClick: searchPublicSpaces,
    },
  ]

  if (!isHome) {
    assert(
      addRoomToSpace !== undefined,
      "If not home space addRoomToSpace should not be undefined."
    )

    menuItems.unshift({
      icon: MdPlaylistAddCircle,
      text: t(LangKey.AddToSpace),
      onClick: addRoomToSpace,
    })
  }

  return menuItems
}

export type BuildDirectRoomsTemplate = {
  isHome?: boolean
  onCreateDirectRoom: () => void
  addRoomToSpace?: () => void
}

export function buildDirectRoomsMenuItems({
  onCreateDirectRoom,
  addRoomToSpace,
  isHome,
}: BuildDirectRoomsTemplate): ContextMenuItem[] {
  const menuItems: ContextMenuItem[] = [
    {
      icon: IoAddCircle,
      text: t(LangKey.CreateDM),
      onClick: onCreateDirectRoom,
    },
  ]

  if (!isHome) {
    assert(
      addRoomToSpace !== undefined,
      "If not home space addRoomToSpace should not be undefined."
    )

    menuItems.unshift({
      icon: MdPlaylistAddCircle,
      text: t(LangKey.AddToSpace),
      onClick: addRoomToSpace,
    })
  }

  return menuItems
}
