import {
  faArrowDownShortWide,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useMemo, type FC} from "react"
import IconButton from "./IconButton"
import Label from "./Label"
import RosterUser, {UserPowerLevel} from "./RosterUser"
import {type UserProfileProps} from "./UserProfile"
import UserProfileGhost from "./UserProfileGhost"
import {twMerge} from "tailwind-merge"
import useActiveRoom from "@/hooks/matrix/useActiveRoom"

export enum RosterUserCategory {
  Admin,
  Member,
}

export type RosterUserData = {
  category: RosterUserCategory
  userProfileProps: UserProfileProps
}

export type RosterProps = {
  className?: string
}

const Roster: FC<RosterProps> = ({className}) => {
  const {members} = useActiveRoom()

  const joinedMembersElement = useMemo(
    () =>
      members
        .filter(member => member.powerLevel === UserPowerLevel.Member)
        ?.map((member, index) => <RosterUser key={index} {...member} />),
    [members]
  )

  const adminMembersElement = useMemo(
    () =>
      members
        .filter(member => member.powerLevel === UserPowerLevel.Admin)
        ?.map((member, index) => <RosterUser key={index} {...member} />),
    [members]
  )

  return (
    <div className={twMerge("flex h-full flex-col", className)}>
      <header className="flex items-center p-4">
        <FontAwesomeIcon className="text-neutral-200" icon={faUserGroup} />

        <div className="ml-[5px] w-full text-neutral-600">People</div>

        <IconButton
          tooltip="Sort members"
          icon={faArrowDownShortWide}
          onClick={() => {
            // TODO: Handle `sort` button click.
          }}
        />
      </header>

      <div className="h-[1px] w-full bg-neutral-300" />

      <div className="flex h-full grow flex-col gap-[5px] overflow-y-scroll scrollbar-hide">
        <div className="mt-[10px] flex flex-col gap-1">
          <Label
            className="p-[5px]"
            text={"Admin — " + (adminMembersElement?.length ?? "0")}
          />

          {adminMembersElement}
        </div>

        <div className="flex flex-col gap-1">
          <Label
            className="p-[5px]"
            text={"Member — " + (joinedMembersElement?.length ?? "0")}
          />

          {joinedMembersElement}
        </div>

        <UserProfileGhost className="w-max" count={4} opacityMultiplier={0.2} />
      </div>
    </div>
  )
}

export default Roster
