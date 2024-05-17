import {type FC} from "react"
import IconButton from "../../components/IconButton"
import {type UserProfileProps as UserProfileProperties} from "../../components/UserProfile"
import {twMerge} from "tailwind-merge"
import useRoomMembers from "@/hooks/matrix/useRoomMembers"
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
  className?: string
}

const Roster: FC<RosterProps> = ({className}) => {
  const {sections, isMemberLoading} = useRoomMembers()

  return (
    <>
      <div className={twMerge("flex h-full flex-col", className)}>
        <header className="border-b border-b-slate-300 p-3">
          <div className="m-0.5 flex items-center">
            <IoPeople size={27} className="text-neutral-300" />

            <Typography className="ml-1 w-full text-neutral-600">
              People
            </Typography>

            <IconButton
              tooltip="Sort members"
              Icon={IoFilterCircle}
              size={20}
              onClick={() => {
                // TODO: Handle `sort` button click.
              }}
            />
          </div>
        </header>

        <MemberList
          className="m-1 w-52"
          isLoading={isMemberLoading}
          sections={sections}
        />
      </div>
    </>
  )
}

export default Roster
