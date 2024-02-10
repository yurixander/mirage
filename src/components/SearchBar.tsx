import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React, {useState, type FC} from "react"
import KeyCue from "./KeyCue"

export type SearchResult = {
  text: string
  onClick: () => void
}

export type SearchBarProps = {
  onQueryChange: (query: string) => SearchResult[]
}

const SearchBar: FC<SearchBarProps> = ({onQueryChange}) => {
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

  // TODO: Consider using useCallback
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MINIMUM_QUERY_LENGTH = 3

    if (event.target.value.length < MINIMUM_QUERY_LENGTH) {
      setResults([])

      return
    }

    // OPTIMIZE: In the future, this can be optimized by caching the results, and also using a trie data structure to handle character-by-character changes in the query.
    setResults(onQueryChange(event.target.value))
  }

  return (
    <div
      className={
        "relative p-3 inline-flex justify-start items-center gap-[5px] bg-neutral-300 rounded-xl " +
        (results.length > 0 ? "rounded-bl-none rounded-br-none" : "")
      }>
      <FontAwesomeIcon className="text-neutral-400" icon={faSearch} />

      <input
        className="bg-neutral-300 p-0"
        onChange={handleQueryChange}
        ref={inputRef}
        type="text"
        placeholder="Search anything..."
      />

      <KeyCue ctrl char={KEYBOARD_HOTKEY_CHAR} />

      {results.length > 0 && (
        <div className="absolute left-0 top-full w-full rounded-b-xl border-t border-solid border-neutral-300 bg-neutral-300 p-[10px]">
          {results.map((result, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md p-[10px] hover:bg-neutral-300"
              onClick={result.onClick}>
              {result.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
