import {IoMdDownload, IoMdTrash, IoIosSettings} from "react-icons/io"
import {
  IoArrowUndo,
  IoArrowRedo,
  IoReloadCircle,
  IoAddCircle,
  IoSearchCircle,
} from "react-icons/io5"

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
