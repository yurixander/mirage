import "../styles/SearchBar.sass"
import {ReactComponent as SearchIcon} from "../../public/icons/search.svg"
import KeyCue from "./KeyCue"
import useGlobalHotkey from "../hooks/useGlobalHotkey"
import React from "react"

export type SearchBarProps = {
  //
}

export default function SearchBar(props: SearchBarProps) {
  const KEYBOARD_HOTKEY_CHAR = "s"
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Focus the input when the user presses the search hotkey.
  useGlobalHotkey({ctrl: true, key: KEYBOARD_HOTKEY_CHAR}, () =>
    inputRef.current?.focus()
  )

  return (
    <div className="SearchBar">
      <SearchIcon />
      <input ref={inputRef} type="text" placeholder="Search anything..." />
      <KeyCue ctrl char={KEYBOARD_HOTKEY_CHAR} />
    </div>
  )
}
