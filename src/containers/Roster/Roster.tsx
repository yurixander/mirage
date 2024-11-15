import {type FC} from "react"
import {IoFilterCircle, IoPeople, IoReloadOutline} from "react-icons/io5"
import {SmartScrollArea} from "@/components/ui/scroll-area"
import RosterUser, {type RosterUserData} from "./RosterUser"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"
import {Button, IconButton} from "@/components/ui/button"
import UserProfileGhost from "@/components/UserProfileGhost"
import {type GroupedMembers} from "./hooks/useRoomMembers"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "@/components/ui/typography"
import {type ValueState} from "@/hooks/util/useValueState"
import ValueStateHandler from "@/components/ValueStateHandler"
import Loader from "@/components/Loader"

export enum RosterUserCategory {
  Admin,
  Member,
}

export type RosterProps = {
  isLazyLoading: boolean
  membersState: ValueState<GroupedMembers>
  onUserClick: (userId: string) => void
  onLazyLoad: () => void
  onReloadMembers: () => void
  className?: string
}

const MAX_MEMBERS_LENGTH_FOR_GHOST = 10

const Roster: FC<RosterProps> = ({
  onUserClick,
  onReloadMembers,
  membersState,
  onLazyLoad,
  isLazyLoading,
  className,
}) => {
  const {t} = useTranslation()

  return (
    <div
      className={twMerge(
        "flex h-full w-60 flex-col border-l border-l-neutral-300 bg-gray-50 dark:border-l-neutral-600 dark:bg-neutral-900",
        className
      )}>
      <header className="flex size-full h-12 items-center gap-x-1.5 border-b border-b-neutral-300 pl-3 pr-1 dark:border-b-neutral-600">
        <IoPeople className="size-5 text-neutral-500 dark:text-neutral-400" />

        <Heading
          level="h5"
          className="w-auto grow text-neutral-600 dark:text-neutral-300">
          {t(LangKey.People)}
        </Heading>

        <IconButton
          aria-label={t(LangKey.SortMembers)}
          tooltip={t(LangKey.SortMembers)}
          className="text-neutral-500 dark:text-neutral-400">
          <IoFilterCircle className="size-5" />
        </IconButton>
      </header>

      <ValueStateHandler
        value={membersState}
        loading={
          <div className="flex flex-col gap-6 pt-3">
            <RosterSectionSkeleton elementsCount={2} />

            <RosterSectionSkeleton elementsCount={1} />

            <RosterSectionSkeleton elementsCount={5} />
          </div>
        }
        error={() => (
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
        )}>
        {({admins, moderators, members}) => (
          <SmartScrollArea
            avoidOverflow
            className="px-1 pt-3"
            type="scroll"
            endScrollChange={isEnd => {
              if (!isEnd || isLazyLoading) {
                return
              }

              onLazyLoad()
            }}>
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
              MAX_MEMBERS_LENGTH_FOR_GHOST &&
              !isLazyLoading && (
                <UserProfileGhost
                  className="p-2"
                  count={4}
                  opacityMultiplier={0.2}
                />
              )}

            {isLazyLoading && (
              <div className="h-32 w-full">
                <Loader text="Loading" />
              </div>
            )}
          </SmartScrollArea>
        )}
      </ValueStateHandler>
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
      <Text
        size="2"
        as="label"
        weight="medium"
        className="ml-2 text-neutral-500 dark:text-neutral-400">
        {title}
      </Text>

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
