import "../styles/Roster.sass"
import IconButton from "./IconButton"
import Label from "./Label"
import RosterUser from "./RosterUser"
import {UserProfileProps} from "./UserProfile"
import UserProfileGhost from "./UserProfileGhost"
import {faArrowDownShortWide, faUserGroup} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export enum RosterUserCategory {
  Admin,
  Member
}

export type RosterUserData = {
  category: RosterUserCategory,
  userProfileProps: UserProfileProps
}

export type RosterProps = {
  users: RosterUserData[]
}

export default function Roster(props: RosterProps) {
  const admins = props.users.filter(user => user.category === RosterUserCategory.Admin)
  const members = props.users.filter(user => user.category === RosterUserCategory.Member)

  return (
    <div className="Roster">
      <header className="header">
        <FontAwesomeIcon className="icon" icon={faUserGroup} />
        <div className="title">People</div>
        <IconButton
          onClick={() => {
            // TODO: Handle `sort` button click.
          }}
          tooltip="Sort members"
          tooltipPlacement="right"
          icon={faArrowDownShortWide} />
      </header>
      <div className="divider" />
      <div className="scroll-container">
        <div className="admins">
          <Label className="sticky-header" text={"Admin — " + admins.length} />
          {admins.map(admin => <RosterUser onClick={() => { }} {...admin} />)}
        </div>
        <div className="members">
          <Label className="sticky-header" text={"Member — " + members.length} />
          {members.map(member => <RosterUser onClick={() => { }} {...member} />)}
        </div>
        <UserProfileGhost count={4} opacityMultiplier={0.20} />
      </div>
    </div>
  )
}
