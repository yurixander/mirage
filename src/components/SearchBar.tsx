import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"
import React, {useState, type FC} from "react"
import KeyCue from "./KeyCue"
import {twMerge} from "tailwind-merge"
import {IoSearch} from "react-icons/io5"

export type SearchResult = {
  text: string
  onClick: () => void
}

export type SearchBarProps = {
  onQueryChange: (query: string) => SearchResult[]
  className?: string
}

const SearchBar: FC<SearchBarProps> = ({onQueryChange, className}) => {
  const KEYBOARD_HOTKEY_CHAR = "s"
  const inputReference = React.useRef<HTMLInputElement>(null)
  const [results, setResults] = useState<SearchResult[]>([])

  // Focus the input when the user presses the search hotkey.
  useGlobalHotkey({ctrl: true, key: KEYBOARD_HOTKEY_CHAR}, () => {
    // NOTE: The input is required to be focused before selecting
    // the text.
    inputReference.current?.focus()

    // Select all the text in the input after focusing it,
    // do that the user can instantly start typing a new query.
    inputReference.current?.select()
  })

  // TODO: Consider using `useCallback`.
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
      className={twMerge(
        "relative inline-flex items-center justify-start gap-1 rounded-lg bg-neutral-200 p-2",
        results.length > 0 ? "rounded-bl-none rounded-br-none" : "",
        className
      )}>
      <IoSearch className="size-3 text-neutral-400" />

      <input
        className="bg-neutral-200 p-0 text-xs"
        onChange={handleQueryChange}
        ref={inputReference}
        type="text"
        placeholder="Search anything..."
      />

      <KeyCue ctrl char={KEYBOARD_HOTKEY_CHAR} />

      {results.length > 0 && (
        <div className="absolute left-0 top-full w-full rounded-b-xl border-t border-solid border-neutral-300 bg-neutral-300 p-3">
          {results.map((result, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md p-3 hover:bg-neutral-300"
              onClick={result.onClick}
              aria-hidden="true">
              {result.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
