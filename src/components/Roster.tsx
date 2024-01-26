import {useMemo, type FC} from "react"
import "../styles/Roster.sass"
import IconButton from "./IconButton"
import Label from "./Label"
import RosterUser from "./RosterUser"
import {type UserProfileProps} from "./UserProfile"
import UserProfileGhost from "./UserProfileGhost"
import {
  faArrowDownShortWide,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export enum RosterUserCategory {
  Admin,
  Member,
}

export type RosterUserData = {
  category: RosterUserCategory
  userProfileProps: UserProfileProps
}

export type RosterProps = {
  users: RosterUserData[]
}

const Roster: FC<RosterProps> = ({users}) => {
  const admins = useMemo(
    () => users.filter(user => user.category === RosterUserCategory.Admin),
    [users]
  )

  const members = useMemo(
    () => users.filter(user => user.category === RosterUserCategory.Member),
    [users]
  )

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
          icon={faArrowDownShortWide}
        />
      </header>

      <div className="divider" />

      <div className="scroll-container">
        <div className="admins">
          <Label className="sticky-header" text={"Admin — " + admins.length} />

          {admins.map((admin, index) => (
            <RosterUser key={index} onClick={() => {}} {...admin} />
          ))}
        </div>

        <div className="members">
          <Label
            className="sticky-header"
            text={"Member — " + members.length}
          />

          {members.map((member, index) => (
            <RosterUser key={index} onClick={() => {}} {...member} />
          ))}
        </div>

        <UserProfileGhost count={4} opacityMultiplier={0.2} />
      </div>
    </div>
  )
}

export default Roster
