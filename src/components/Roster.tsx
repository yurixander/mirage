import {
  faArrowDownShortWide,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useMemo, type FC} from "react"
import IconButton from "./IconButton"
import Label from "./Label"
import RosterUser from "./RosterUser"
import {type UserProfileProps} from "./UserProfile"
import UserProfileGhost from "./UserProfileGhost"

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

  const memberElements = useMemo(
    () =>
      members.map((member, index) => (
        <RosterUser key={index} onClick={() => {}} {...member} />
      )),
    [members]
  )

  return (
    <div className="flex h-full flex-col">
      <header className="m-[5px] flex items-center">
        <FontAwesomeIcon className="text-neutral-200" icon={faUserGroup} />

        <div className="ml-[5px] w-full">People</div>

        <IconButton
          onClick={() => {
            // TODO: Handle `sort` button click.
          }}
          tooltip="Sort members"
          tooltipPlacement="right"
          icon={faArrowDownShortWide}
        />
      </header>

      <div className="h-[1px] w-full bg-neutral-300" />

      <div className="flex h-full grow flex-col gap-[5px] overflow-y-scroll scrollbar-hide">
        <div className="mt-[10px] flex flex-col gap-1">
          <Label className="p-[5px]" text={"Admin — " + admins.length} />

          {admins.map((admin, index) => (
            <RosterUser key={index} onClick={() => {}} {...admin} />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <Label className="p-[5px]" text={"Member — " + members.length} />

          {memberElements}
        </div>

        <UserProfileGhost count={4} opacityMultiplier={0.2} />
      </div>
    </div>
  )
}

export default Roster
