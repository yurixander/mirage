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
import {getImageUrl} from "@/utils/util"

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
  const {defaultMembers, adminMembers, client} = useActiveRoom()

  const joinedMembersElement = useMemo(
    () =>
      defaultMembers?.map((member, index) => (
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
      )),
    [defaultMembers]
  )

  const adminMembersElement = useMemo(
    () =>
      adminMembers?.map((member, index) => (
        <RosterUser
          key={index}
          userProfileProps={{
            avatarUrl:
              getImageUrl(member.avatarUrl ?? null, client) ?? undefined,
            text: "Online",
            displayName: member.displayName ?? member.userId,
            displayNameColor: "",
            status: UserStatus.Online,
          }}
          onClick={function (): void {
            throw new Error("Function not implemented.")
          }}
        />
      )),
    [adminMembers, client]
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
            text={"Admin — " + (adminMembers?.length ?? "0")}
          />

          {adminMembersElement}
        </div>

        <div className="flex flex-col gap-1">
          <Label
            className="p-[5px]"
            text={"Member — " + (defaultMembers?.length ?? "0")}
          />

          {joinedMembersElement}
        </div>

        <UserProfileGhost className="w-max" count={4} opacityMultiplier={0.2} />
      </div>
    </div>
  )
}

export default Roster
