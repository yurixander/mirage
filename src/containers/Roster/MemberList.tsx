import {type FC} from "react"
import RosterUser, {type RosterUserProps} from "./RosterUser"
import Label from "@/components/Label"
import UserProfileGhost from "@/components/UserProfileGhost"

export type MemberListProps = {
  sections: MemberSection[]
}

type MemberSection = {
  title: string
  users: RosterUserProps[]
}

const MemberList: FC<MemberListProps> = ({sections}) => {
  return (
    <div className="flex h-full max-w-56 flex-col overflow-y-scroll">
      <div className="flex flex-col gap-4">
        {sections.map(memberSection => (
          <div className="flex flex-col gap-1">
            <Label
              className="sticky top-0 z-10 ml-1 bg-white font-bold text-slate-400"
              text={`${memberSection.title} — ${memberSection.users.length}`}
            />

            {memberSection.users.map(user => (
              <RosterUser {...user} />
            ))}
          </div>
        ))}
      </div>

      <UserProfileGhost className="w-max" count={4} opacityMultiplier={0.2} />
    </div>
  )
}

export default MemberList
