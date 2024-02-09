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
import useRoomSelector from "@/hooks/matrix/useRoomSelector"

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
  // TODO: Prefer use roomId with client.getRoom(roomID)
  const {selectedRoom} = useRoomSelector()

  console.log("Hey this room is selected: ", selectedRoom)

  const joinedMembers = useMemo(
    () => selectedRoom?.getMembers(),
    [selectedRoom]
  )

  const joinedMembersElement = useMemo(
    () =>
      joinedMembers?.map((member, index) => (
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
            activity: undefined,
            icon: undefined,
            platform: undefined,
            isLarge: undefined,
          }}
          onClick={function (): void {
            throw new Error("Function not implemented.")
          }}
        />
      )),
    [joinedMembers]
  )

  const admins = useMemo(
    () => users.filter(user => user.category === RosterUserCategory.Admin),
    [users]
  )

  const members = useMemo(
    () => users.filter(user => user.category === RosterUserCategory.Member),
    [users]
  )

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
          onClick={() => {
            // TODO: Handle `sort` button click.
          }}
          tooltip="Sort members"
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

          {joinedMembersElement}
        </div>

        <UserProfileGhost count={4} opacityMultiplier={0.2} />
      </div>
    </div>
  )
}

export default Roster
