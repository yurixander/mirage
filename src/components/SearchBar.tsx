import "../styles/SearchBar.sass"
import {ReactComponent as SearchIcon} from "../../public/icons/search.svg"
import KeyCue from "./KeyCue"

export type SearchBarProps = {
  //
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="SearchBar">
      <SearchIcon />
      <input type="text" placeholder="Search anything..." />
      <KeyCue ctrl char="s" />
    </div>
  )
}
