import {type FC} from "react"
import RosterUser, {type RosterUserData} from "./RosterUser"
import Label from "@/components/Label"
import UserProfileGhost from "@/components/UserProfileGhost"
import {twMerge} from "tailwind-merge"
import Loader from "@/components/Loader"
import Typography, {TypographyVariant} from "@/components/Typography"

export type MemberListProps = {
  sections: MemberSection[]
  isLoading?: boolean
  isError?: boolean
  className?: string
}

export type MemberSection = {
  title: string
  users: RosterUserData[]
}

const MemberList: FC<MemberListProps> = ({
  sections,
  className,
  isLoading = false,
  isError = false,
}) => {
  return (
    <div
      className={twMerge(
        "flex size-full flex-col overflow-y-scroll p-2",
        className
      )}>
      {isError ? (
        <div className="flex size-full flex-col items-center justify-center">
          <Typography className="font-bold">Members Error</Typography>

          <Typography
            className="text-center"
            variant={TypographyVariant.BodyMedium}>
            The list of members could not be loaded
          </Typography>
        </div>
      ) : isLoading ? (
        <Loader text="Loading members" />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {sections.map(
              (memberSection, index) =>
                memberSection.users.length > 0 && (
                  <div className="flex flex-col gap-1" key={index}>
                    <Label
                      className="sticky top-0 z-10 ml-1 bg-gray-50 font-bold text-slate-400"
                      text={`${memberSection.title} — ${memberSection.users.length}`}
                    />

                    {memberSection.users.map(user => (
                      <RosterUser
                        {...user}
                        key={user.userId}
                        onUserClick={() => {
                          // TODO: Handle `onUserClick` here.
                        }}
                      />
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
