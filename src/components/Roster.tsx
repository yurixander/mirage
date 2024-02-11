import {
  faArrowDownShortWide,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useMemo, type FC} from "react"
import IconButton from "./IconButton"
import Label from "./Label"
import RosterUser from "./RosterUser"
import {UserStatus, type UserProfileProps} from "./UserProfile"
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
  users: RosterUserData[]
  className: string
}

const Roster: FC<RosterProps> = ({users, className}) => {
  const {activeRoom} = useActiveRoom()

  const joinedMembersElement = useMemo(() => {
    if (activeRoom === null) {
      return null
    }

    return activeRoom.getJoinedMembers().map((member, index) => (
      <RosterUser
        key={index}
        userProfileProps={{
          avatarUrl:
            member.getAvatarUrl(
              "https://matrix-client.matrix.org",
              64,
              64,
              "scale",
              true,
              false
            ) ?? undefined,
          text: "Online",
          displayName: member.name,
          displayNameColor: "",
          status: UserStatus.Online,
        }}
        onClick={function (): void {
          throw new Error("Function not implemented.")
        }}
      />
    ))
  }, [activeRoom])

  const admins = useMemo(
    () => users.filter(user => user.category === RosterUserCategory.Admin),
    [users]
  )

  // const members = useMemo(
  //   () => users.filter(user => user.category === RosterUserCategory.Member),
  //   [users]
  // )

  // const memberElements = useMemo(
  //   () =>
  //     members.map((member, index) => (
  //       <RosterUser key={index} onClick={() => {}} {...member} />
  //     )),
  //   [members]
  // )

  return (
    <div className={twMerge("flex h-full flex-col", className)}>
      <header className="m-[5px] flex items-center">
        <FontAwesomeIcon className="text-neutral-200" icon={faUserGroup} />

        <div className="ml-[5px] w-full">People</div>

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
          <Label className="p-[5px]" text={"Admin — " + admins.length} />

          {admins.map((admin, index) => (
            <RosterUser key={index} onClick={() => {}} {...admin} />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <Label
            className="p-[5px]"
            text={"Member — " + (joinedMembersElement?.length ?? "0")}
          />

          {joinedMembersElement}
        </div>

        <UserProfileGhost count={4} opacityMultiplier={0.2} />
      </div>
    </div>
  )
}

export default Roster
