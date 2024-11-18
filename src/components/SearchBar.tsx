import {FC, useEffect, useRef, useState} from "react"
import {IoSearch} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import KeyCue from "./KeyCue"
import useDebounced from "@/hooks/util/useDebounced"
import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"

type SearchBarProps = {
  searchDelay?: number
  initialValue?: string
  onDebounceChange: (value: string) => void
  className?: string
}

const SearchBar: FC<SearchBarProps> = ({
  initialValue,
  searchDelay = 500,
  onDebounceChange,
  className,
}) => {
  const [query, setQuery] = useState(initialValue ?? "")
  const debouncedQuery = useDebounced(query, searchDelay)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    onDebounceChange(debouncedQuery)
  }, [debouncedQuery, onDebounceChange])

  useGlobalHotkey({key: "B", ctrl: true}, () => {
    if (inputRef.current === null) {
      return
    }

    inputRef.current.focus()
  })

  return (
    <div
      className={twMerge(
        "flex h-8 w-full items-center rounded-sm border border-neutral-300/70 bg-neutral-200/70 px-2 dark:border-neutral-700 dark:bg-neutral-800",
        className
      )}>
      <IoSearch className="text-muted-foreground" />

      <input
        ref={inputRef}
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="grow bg-transparent text-foreground placeholder:text-muted-foreground"
      />

      <KeyCue char="B" ctrl size="sm" />
    </div>
  )
}

export default SearchBar
