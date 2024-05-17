import {type FC} from "react"
import RosterUser, {type RosterUserProps} from "./RosterUser"
import Label from "@/components/Label"
import UserProfileGhost from "@/components/UserProfileGhost"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"

export type MemberListProps = {
  sections: MemberSection[]
  isLoading?: boolean
  className?: string
}

export type MemberSection = {
  title: string
  users: RosterUserProps[]
}

const MemberList: FC<MemberListProps> = ({
  sections,
  className,
  isLoading = false,
}) => {
  return (
    <div
      className={twMerge(
        "flex size-full flex-col overflow-y-scroll",
        className
      )}>
      {isLoading ? (
        <Loader text="Charging members..." />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {sections.map(
              memberSection =>
                memberSection.users.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <Label
                      className="sticky top-0 z-10 ml-1 bg-white font-bold text-slate-400"
                      text={`${memberSection.title} — ${memberSection.users.length}`}
                    />

                    {memberSection.users.map(user => (
                      <RosterUser {...user} />
                    ))}
                  </div>
                )
            )}
          </div>

          <UserProfileGhost count={4} opacityMultiplier={0.2} />
        </>
      )}
    </div>
  )
}

export default MemberList
