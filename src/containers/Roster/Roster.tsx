import React, {useMemo, type FC} from "react"
import IconButton from "../../components/IconButton"
import {IoFilterCircle, IoPeople} from "react-icons/io5"
import Typography from "@/components/Typography"
import {ScrollArea} from "@/components/ui/scroll-area"
import RosterUser, {type RosterUserData} from "./RosterUser"
import {UserPowerLevel} from "@/utils/members"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"

export enum RosterUserCategory {
  Admin,
  Member,
}

export type RosterProps = {
  members: RosterUserData[]
  isLoading: boolean
  onUserClick: (userId: string) => void
  className?: string
}

const Roster: FC<RosterProps> = ({
  members,
  onUserClick,
  isLoading,
  className,
}) => {
  // const {sections, isMembersLoading, isMembersError} = useRoomMembers(roomId)

  const adminsComponents = useMemo(
    () =>
      members
        .filter(member => member.powerLevel === UserPowerLevel.Admin)
        .map(member => (
          <RosterUser
            key={member.userId}
            {...member}
            onUserClick={onUserClick}
          />
        )),
    [members, onUserClick]
  )

  const moderatorsComponents = useMemo(
    () =>
      members
        .filter(member => member.powerLevel === UserPowerLevel.Moderator)
        .map(member => (
          <RosterUser
            key={member.userId}
            {...member}
            onUserClick={onUserClick}
          />
        )),
    [members, onUserClick]
  )

  const membersComponents = useMemo(
    () =>
      members
        .filter(member => member.powerLevel === UserPowerLevel.Member)
        .map(member => (
          <RosterUser
            key={member.userId}
            {...member}
            onUserClick={onUserClick}
          />
        )),
    [members, onUserClick]
  )

  return (
    <div
      className={twMerge(
        "flex size-full max-w-60 flex-col border border-l-slate-300 bg-gray-50",
        className
      )}>
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

      <ScrollArea className="px-1 pt-3" type="scroll">
        <div className="flex flex-col gap-4">
          <RosterSection title="Admins --- 1" components={adminsComponents} />

          <RosterSection
            title="Moderators --- 1"
            components={moderatorsComponents}
          />

          <RosterSection title="Members --- 1" components={membersComponents} />
        </div>
      </ScrollArea>
    </div>
  )
}

const RosterSection: FC<{
  title: string
  components: React.JSX.Element[]
}> = ({components, title}) => {
  if (components.length === 0) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-2.5">
      <motion.div
        initial={{scale: 0, opacity: 0}}
        whileInView={{scale: 1, opacity: 1}}>
        <Typography className="ml-2">{title}</Typography>
      </motion.div>

      <div className="flex flex-col gap-1.5">{components}</div>
    </div>
  )
}

export default Roster
