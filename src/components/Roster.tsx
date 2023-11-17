import "../styles/Roster.sass"
import IconButton from "./IconButton"
import {ReactComponent as PeopleIcon} from "../../public/icons/people.svg"
import {ReactComponent as SortIcon} from "../../public/icons/sort.svg"
import Label from "./Label"
import UserProfile, {UserProfileProps} from "./UserProfile"
import UserProfileGhost from "./UserProfileGhost"

export enum Category {
  Admin,
  Member
}

export type RosterUserData = {
  category: Category,
  userProfileProps: UserProfileProps
}

export type RosterProps = {
  users: RosterUserData[]
}

export default function Roster(props: RosterProps) {
  const admins = props.users.filter(user => user.category === Category.Admin)
  const members = props.users.filter(user => user.category === Category.Member)

  return (
    <div className="Roster">
      <div className="header">
        <PeopleIcon />
        <div className="title">People</div>
        <IconButton
          onClick={() => {
            //TODO: Handle sort button click
          }}
          tooltip="Sort by..."
          tooltipPlacement="right"
          icon={SortIcon} />
      </div>
      <div className="divider" />
      <div className="scroll-container">
        <div className="admins">
          <Label text={"admin — " + admins.length} />
          {admins.map(admin => <UserProfile {...admin.userProfileProps} />)}
        </div>
        <div className="members">
          <Label text={"member — " + members.length} />
          {members.map(member => <UserProfile {...member.userProfileProps} />)}
        </div>
        <UserProfileGhost count={4} opacityMultiplier={0.20} />
      </div>
    </div>
  )
}
