import {useMemo, type FC} from "react"
import IconButton from "./IconButton"
import Label from "./Label"
import RosterUser, {UserPowerLevel} from "./RosterUser"
import {type UserProfileProps as UserProfileProperties} from "./UserProfile"
import UserProfileGhost from "./UserProfileGhost"
import {twMerge} from "tailwind-merge"
import useRoomMembers from "@/hooks/matrix/useRoomMembers"
import {IoFilterCircle, IoPeople} from "react-icons/io5"

export enum RosterUserCategory {
  Admin,
  Member,
}

export type RosterUserData = {
  category: RosterUserCategory
  userProfileProps: UserProfileProperties
}

export type RosterProps = {
  className?: string
}

const Roster: FC<RosterProps> = ({className}) => {
  const {members} = useRoomMembers()

  const joinedMembersElement = useMemo(
    () =>
      members
        .filter(member => member.powerLevel === UserPowerLevel.Member)
        .map(member => <RosterUser key={member.userId} {...member} />),
    [members]
  )

  const moderatorMembersElement = useMemo(
    () =>
      members
        .filter(member => member.powerLevel === UserPowerLevel.Moderator)
        .map(member => <RosterUser key={member.userId} {...member} />),
    [members]
  )

  const adminMembersElement = useMemo(
    () =>
      members
        .filter(member => member.powerLevel === UserPowerLevel.Admin)
        .map(member => <RosterUser key={member.userId} {...member} />),
    [members]
  )

  return (
    <>
      <div className={twMerge("flex h-full flex-col", className)}>
        <header className="flex items-center p-4">
          <IoPeople size={28} className="text-neutral-300" />

          <div className="ml-[5px] w-full text-neutral-600">People</div>

          <IconButton
            tooltip="Sort members"
            Icon={IoFilterCircle}
            onClick={() => {
              // TODO: Handle `sort` button click.
            }}
          />
        </header>

        <div className="h-px w-full bg-neutral-300" />

        <div className="flex h-full grow flex-col gap-[5px] overflow-y-scroll scrollbar-hide">
          <div className="mt-[10px] flex flex-col gap-1">
            <Label
              className="p-[5px]"
              text={"Admin — " + adminMembersElement.length}
            />

            {adminMembersElement}
          </div>

          {moderatorMembersElement.length > 0 && (
            <div className="flex flex-col gap-1">
              <Label
                className="p-[5px]"
                text={"Moderator — " + moderatorMembersElement.length}
              />

              {moderatorMembersElement}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <Label
              className="p-[5px]"
              text={"Member — " + joinedMembersElement.length}
            />

            {joinedMembersElement}
          </div>

          <UserProfileGhost
            className="w-max"
            count={4}
            opacityMultiplier={0.2}
          />
        </div>
      </div>
    </>
  )
}

export default Roster
