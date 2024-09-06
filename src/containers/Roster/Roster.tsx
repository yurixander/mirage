import React, {useMemo, type FC} from "react"
import IconButton from "../../components/IconButton"
import {IoFilterCircle, IoPeople, IoReloadOutline} from "react-icons/io5"
import Typography, {TypographyVariant} from "@/components/Typography"
import {ScrollArea} from "@/components/ui/scroll-area"
import RosterUser, {type RosterUserData} from "./RosterUser"
import {UserPowerLevel} from "@/utils/members"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import UserProfileGhost from "@/components/UserProfileGhost"

export enum RosterUserCategory {
  Admin,
  Member,
}

export type RosterProps = {
  members: RosterUserData[]
  isLoading: boolean
  isError?: boolean
  onUserClick: (userId: string) => void
  onReloadMembers: () => void
  className?: string
}

const MAX_MEMBERS_LENGTH_FOR_GHOST = 10

const Roster: FC<RosterProps> = ({
  members,
  onUserClick,
  isLoading,
  isError,
  onReloadMembers,
  className,
}) => {
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
        "flex size-full flex-col border border-l-slate-300 bg-gray-50",
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

      {isError === true ? (
        <div className="flex size-full flex-col items-center justify-center gap-1 p-1">
          <Typography variant={TypographyVariant.Heading}>
            Members Error
          </Typography>

          <Button
            aria-label="Reload members"
            className="mt-1"
            size="sm"
            variant="outline"
            onClick={onReloadMembers}>
            Reload Members <IoReloadOutline className="ml-1" />
          </Button>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-6 pt-3">
          <RosterSectionSkeleton elementsCount={2} />

          <RosterSectionSkeleton elementsCount={1} />

          <RosterSectionSkeleton elementsCount={5} />
        </div>
      ) : (
        <ScrollArea className="px-1 pt-3" type="scroll">
          <div className="flex flex-col gap-4">
            <RosterSection
              title={`ADMINS — ${adminsComponents.length}`}
              components={adminsComponents}
            />

            <RosterSection
              title={`MODERATORS — ${moderatorsComponents.length}`}
              components={moderatorsComponents}
            />

            <RosterSection
              title={`MEMBERS — ${membersComponents.length}`}
              components={membersComponents}
            />
          </div>

          {members.length <= MAX_MEMBERS_LENGTH_FOR_GHOST && (
            <UserProfileGhost
              className="p-2"
              count={4}
              opacityMultiplier={0.2}
            />
          )}
        </ScrollArea>
      )}
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
        <Typography
          variant={TypographyVariant.BodyMedium}
          className="ml-2 font-medium text-slate-400">
          {title}
        </Typography>
      </motion.div>

      <div className="flex flex-col gap-1.5">{components}</div>
    </div>
  )
}

const RosterSectionSkeleton: FC<{elementsCount?: number}> = ({
  elementsCount = 3,
}) => {
  return (
    <div className="m-1 flex flex-col gap-2.5">
      <motion.div
        initial={{width: 0}}
        whileInView={{width: "96px", transition: {velocity: -100}}}
        className="ml-2 h-5 animate-pulse rounded-sm bg-gray-400"
      />

      <div className="flex flex-col gap-1.5">
        {Array.from({length: elementsCount}).map((_, index) => (
          <div key={index} className="flex animate-pulse gap-2 px-2 py-1">
            <motion.div
              initial={{opacity: 0}}
              whileInView={{scale: 1, opacity: 1}}
              className="size-10 rounded-lg bg-gray-400"
            />

            <div className="flex flex-col gap-1.5">
              <motion.div
                initial={{width: 0}}
                whileInView={{width: "96px"}}
                className="h-4 rounded-lg bg-gray-400"
              />

              <motion.div
                initial={{width: 0}}
                whileInView={{width: "64px"}}
                className="h-3 rounded-lg bg-gray-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Roster
