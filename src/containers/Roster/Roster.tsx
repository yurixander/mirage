import {type FC} from "react"
import {IoFilterCircle, IoPeople, IoReloadOutline} from "react-icons/io5"
import {ScrollArea} from "@/components/ui/scroll-area"
import RosterUser, {type RosterUserData} from "./RosterUser"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"
import {Button, IconButton} from "@/components/ui/button"
import UserProfileGhost from "@/components/UserProfileGhost"
import {type GroupedMembers} from "./hooks/useRoomMembers"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "@/components/ui/typography"

export enum RosterUserCategory {
  Admin,
  Member,
}

export type RosterProps = {
  groupedMembers: GroupedMembers | Error
  isLoading: boolean
  onUserClick: (userId: string) => void
  onReloadMembers: () => void
  className?: string
}

const MAX_MEMBERS_LENGTH_FOR_GHOST = 10

const EMPTY_GROUPED_MEMBERS: GroupedMembers = {
  admins: [],
  moderators: [],
  members: [],
}

const Roster: FC<RosterProps> = ({
  groupedMembers,
  onUserClick,
  isLoading,
  onReloadMembers,
  className,
}) => {
  const {t} = useTranslation()
  const hasError = groupedMembers instanceof Error

  const {admins, moderators, members} = hasError
    ? EMPTY_GROUPED_MEMBERS
    : groupedMembers

  return (
    <div
      className={twMerge(
        "flex h-full w-60 flex-col border border-l-neutral-300 bg-gray-50 dark:border-l-neutral-600 dark:bg-neutral-900",
        className
      )}>
      <header className="flex size-full max-h-12 border-b border-b-neutral-300 dark:border-b-neutral-600">
        <div className="m-0.5 ml-3 flex w-full items-center justify-center">
          <IoPeople
            size={25}
            className="text-neutral-500 dark:text-neutral-400"
          />

          <Heading
            level="h5"
            className="ml-2 w-full text-neutral-600 dark:text-neutral-300">
            {t(LangKey.People)}
          </Heading>

          <IconButton
            aria-label={t(LangKey.SortMembers)}
            tooltip={t(LangKey.SortMembers)}
            className="text-neutral-500 dark:text-neutral-400">
            <IoFilterCircle size={20} />
          </IconButton>
        </div>
      </header>

      {hasError ? (
        <div className="flex size-full flex-col items-center justify-center gap-1 p-1">
          <Heading level="h4" align="center">
            {t(LangKey.MembersError)}
          </Heading>

          <Button
            aria-label={t(LangKey.ReloadMembers)}
            className="mt-1"
            size="sm"
            variant="secondary"
            onClick={onReloadMembers}>
            {t(LangKey.ReloadMembers)} <IoReloadOutline className="ml-1" />
          </Button>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-6 pt-3">
          <RosterSectionSkeleton elementsCount={2} />

          <RosterSectionSkeleton elementsCount={1} />

          <RosterSectionSkeleton elementsCount={5} />
        </div>
      ) : (
        <ScrollArea avoidOverflow className="px-1 pt-3" type="scroll">
          <div className="flex flex-col gap-4">
            <RosterSection
              title={t(LangKey.Admins, admins.length.toString())}
              members={admins}
              onUserClick={onUserClick}
            />

            <RosterSection
              title={t(LangKey.Moderators, moderators.length.toString())}
              members={moderators}
              onUserClick={onUserClick}
            />

            <RosterSection
              title={t(LangKey.Members, members.length.toString())}
              members={members}
              onUserClick={onUserClick}
            />
          </div>

          {admins.length + moderators.length + members.length <=
            MAX_MEMBERS_LENGTH_FOR_GHOST && (
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
  members: RosterUserData[]
  onUserClick: (userId: string) => void
}> = ({members, title, onUserClick}) => {
  if (members.length === 0) {
    return <></>
  }

  return (
    <div className="flex w-full flex-col gap-2.5">
      <motion.div
        initial={{scale: 0.8, opacity: 0}}
        whileInView={{scale: 1, opacity: 1}}>
        <Text
          size="2"
          as="label"
          weight="medium"
          className="ml-2 text-neutral-500 dark:text-neutral-400">
          {title}
        </Text>
      </motion.div>

      <div className="flex w-full flex-col gap-1.5">
        {members.map(member => (
          <RosterUser
            key={member.userId}
            {...member}
            onUserClick={onUserClick}
          />
        ))}
      </div>
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
