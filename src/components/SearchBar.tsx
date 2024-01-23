import "../styles/SearchBar.sass"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import KeyCue from "./KeyCue"
import useGlobalHotkey from "../hooks/util/useGlobalHotkey"
import React, {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export type SearchResult = {
  text: string
  onClick: () => void
}

export type SearchBarProps = {
  onQueryChange: (query: string) => SearchResult[]
}

export default function SearchBar(props: SearchBarProps) {
  const KEYBOARD_HOTKEY_CHAR = "s"
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [results, setResults] = useState<SearchResult[]>([])

  // Focus the input when the user presses the search hotkey.
  useGlobalHotkey({ctrl: true, key: KEYBOARD_HOTKEY_CHAR}, () => {
    // NOTE: The input is required to be focused before selecting
    // the text.
    inputRef.current?.focus()

    // Select all the text in the input after focusing it,
    // so that the user can immediately start typing a new query.
    inputRef.current?.select()
  })

  const MINIMUM_QUERY_LENGTH = 3

  // TODO: Consider using useCallback
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < MINIMUM_QUERY_LENGTH) {
      setResults([])

      return
    }

    // OPTIMIZE: In the future, this can be optimized by caching the results, and also using a trie data structure to handle character-by-character changes in the query.
    setResults(props.onQueryChange(event.target.value))
  }

  return (
    <div className={"SearchBar " + (results.length > 0 ? "open" : "")}>
      <FontAwesomeIcon className="search-icon" icon={faSearch} />

      <input
        onChange={handleQueryChange}
        ref={inputRef}
        type="text"
        placeholder="Search anything..."
      />

      <KeyCue ctrl char={KEYBOARD_HOTKEY_CHAR} />

      {results.length > 0 && (
        <div className="results">
          {results.map((result, index) => (
            <div key={index} className="result" onClick={result.onClick}>
              {result.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
