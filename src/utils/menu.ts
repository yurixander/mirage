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

export const CONTEXT_MENU_REPLY = {
  text: "Reply",
  icon: IoArrowUndo,
}

export const CONTEXT_MENU_RESEND = {
  text: "Resend",
  icon: IoArrowRedo,
}

export const CONTEXT_MENU_SAVE = {
  text: "Save",
  icon: IoMdDownload,
}

export const CONTEXT_MENU_DELETE = {
  text: "Delete",
  icon: IoMdTrash,
  color: "red",
}

export const CONTEXT_MENU_SETTINGS = {
  text: "Settings",
  icon: IoIosSettings,
}

export const CONTEXT_MENU_RELOAD = {
  text: "Reload",
  icon: IoReloadCircle,
}

export const CONTEXT_MENU_ADD = {
  text: "Add",
  icon: IoAddCircle,
}

export const CONTEXT_MENU_SEARCH = {
  text: "Search",
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

  if (isMessageError) {
    // If is a message error, should not have context items.

    return []
  }

  if (isSaveable) {
    assert(
      onSaveContent !== undefined,
      "If the content can be saved `onSaveContent` should not be undefined."
    )

    menuItems.push({
      text: "Save",
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
      text: "Resend",
      icon: IoArrowRedo,
      onClick: onResendMessage,
    },
    {
      text: "Reply",
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
      text: "Delete",
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
      text: "Create room",
      onClick: onCreateRoom,
    },
    {
      icon: IoSearchCircle,
      text: "Search rooms",
      onClick: searchPublicRooms,
    },
    {
      icon: IoSearchCircle,
      text: "Search spaces",
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
      text: "Add to space",
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
      text: "Create direct rooms",
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
      text: "Add to space",
      onClick: addRoomToSpace,
    })
  }

  return menuItems
}
