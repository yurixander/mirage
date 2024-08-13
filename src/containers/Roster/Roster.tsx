import {type FC} from "react"
import IconButton from "../../components/IconButton"
import {type UserProfileProps as UserProfileProperties} from "../../components/UserProfile"
import useRoomMembers from "@/containers/Roster/hooks/useRoomMembers"
import {IoFilterCircle, IoPeople} from "react-icons/io5"
import MemberList from "./MemberList"
import Typography from "@/components/Typography"

export enum RosterUserCategory {
  Admin,
  Member,
}

export type RosterUserData = {
  category: RosterUserCategory
  userProfileProps: UserProfileProperties
}

export type RosterProps = {
  roomId: string
  className?: string
}

const Roster: FC<RosterProps> = ({roomId, className}) => {
  const {sections, isMembersLoading, isMembersError} = useRoomMembers(roomId)

  return (
    <div className={className}>
      <header className="flex size-full max-h-12 border-b border-b-slate-300">
        <div className="m-0.5 mx-3 flex w-full items-center justify-center">
          <IoPeople size={25} className="text-neutral-500" />

          <Typography className="ml-1 w-full text-lg text-neutral-600">
            People
          </Typography>

          <IconButton
            tooltip="Sort members"
            Icon={IoFilterCircle}
            size={20}
            iconClassName="text-neutral-500"
            onClick={() => {
              // TODO: Handle `sort` button click.
            }}
          />
        </div>
      </header>

      <MemberList
        className="w-52"
        isLoading={isMembersLoading}
        isError={isMembersError}
        sections={sections}
      />
    </div>
  )
}

export default Roster
