import "../styles/Roster.sass"
import IconButton from "./IconButton"
import {ReactComponent as PeopleIcon} from "../../public/icons/people.svg"
import {ReactComponent as SortIcon} from "../../public/icons/sort.svg"

export default function PeopleList() {
  return (
    <div className="Roster">
      <div className="header">
        <PeopleIcon />
        <div className="title">People</div>
        <IconButton
          onClick={() => {
            //TODO Handle sort button click
          }}
          tooltip="Short by..."
          tooltipPlacement="right"
          icon={SortIcon} />
      </div>
      <div className="divider" />
    </div>
  )
}
