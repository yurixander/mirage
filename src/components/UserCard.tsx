import {type FC} from "react"
import {formatTime} from "../utils/util"
import Button, {ButtonVariant} from "./Button"
import Label from "./Label"
import UserProfile, {
  type UserProfileProps as UserProfileProperties,
} from "./UserProfile"
import Typography, {TypographyVariant} from "./Typography"
import {LangKey} from "@/utils/lang"
import useTranslation from "@/hooks/util/useTranslation"

export type UserCardProps = {
  userProfileProps: UserProfileProperties
  aboutMe: string
  accountCreationTime: number
  serverJoinTime: number
  lastMessageTime: number
  onCancel: () => void
}

const UserCard: FC<UserCardProps> = ({
  aboutMe,
  accountCreationTime,
  lastMessageTime,
  serverJoinTime,
  userProfileProps,
  onCancel,
}) => {
  const {t} = useTranslation()

  return (
    <div className="z-50 flex size-full justify-end px-1">
      <div className="absolute flex min-h-80 w-64 flex-col overflow-hidden rounded-xl border border-neutral-300 bg-neutral-50 shadow-userCard">
        <div className="rounded-xl border-b border-solid border-b-neutral-300 bg-white p-4">
          <UserProfile {...userProfileProps} />
        </div>

        <div className="flex grow flex-col gap-4 bg-neutral-50 p-4">
          <div>
            <Label text={t(LangKey.AboutMe)} />

            <Typography variant={TypographyVariant.BodySmall}>
              {aboutMe}
            </Typography>
          </div>

          <div className="flex flex-col gap-1">
            <Label text={t(LangKey.Account)} />

            <Typography variant={TypographyVariant.BodySmall}>
              {t(LangKey.Created)} <b>{formatTime(accountCreationTime)}</b>
            </Typography>

            <Typography variant={TypographyVariant.BodySmall}>
              {t(LangKey.JoinedServer)} <b>{formatTime(serverJoinTime)}</b>
            </Typography>

            <Typography variant={TypographyVariant.BodySmall}>
              {t(LangKey.LastMessageSentWas)}{" "}
              <b>{formatTime(lastMessageTime)}</b>
            </Typography>
          </div>
        </div>

        <div className="flex flex-row justify-end gap-1 border-t border-solid border-neutral-300 bg-cardActionsBg p-3">
          <Button
            label={t(LangKey.Cancel)}
            variant={ButtonVariant.TextLink}
            onClick={onCancel}
          />

          <Button
            label={t(LangKey.ViewMessages)}
            variant={ButtonVariant.Primary}
            onClick={() => {
              // TODO: Handle click on View messages button.
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default UserCard
