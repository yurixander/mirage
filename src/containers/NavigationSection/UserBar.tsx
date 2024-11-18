import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import {IoMdSettings} from "react-icons/io"
import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import {assert, stringToColor, validateUrl} from "@/utils/util"
import LoadingEffect from "@/components/LoadingEffect"
import {UserDataState} from "./hooks/useUserData"
import {IoAlertCircle, IoRefreshCircle} from "react-icons/io5"
import {LangKey} from "@/lang/allKeys"
import useTranslation from "@/hooks/util/useTranslation"
import {IconButton} from "@/components/ui/button"
import {Heading, Text} from "@/components/ui/typography"
import {getUsernameByUserId} from "@/utils/matrix"

type UserBarProps = {
  userDataState: UserDataState
  userId: string
  displayName: string
  onRefreshData: () => void
  onOpenSettings: () => void
  avatarImageUrl?: string
  className?: string
}

const UserBar: FC<UserBarProps> = ({
  avatarImageUrl,
  displayName,
  userId,
  userDataState,
  onRefreshData,
  onOpenSettings,
  className,
}) => {
  const {t} = useTranslation()

  if (userDataState === UserDataState.Prepared) {
    assert(displayName.length > 0, "Display name should not be empty")
  }

  if (avatarImageUrl !== undefined) {
    assert(
      validateUrl(avatarImageUrl),
      "Avatar image url should be valid if defined"
    )
  }

  return (
    <div className={twMerge("h-14 max-h-14 px-2", className)}>
      <div className="flex size-full items-center justify-between">
        {userDataState === UserDataState.Loading ? (
          <UserBarPlaceHolder />
        ) : userDataState === UserDataState.Error ? (
          <UserBarError />
        ) : (
          <div className="flex gap-1.5 overflow-hidden">
            <AvatarImage
              className="shrink-0"
              isRounded
              avatarType={AvatarType.Profile}
              displayName={displayName}
              avatarUrl={avatarImageUrl}
            />

            <div className="flex flex-col">
              <Heading
                level="h6"
                style={{color: stringToColor(userId)}}
                className="line-clamp-1">
                {displayName}
              </Heading>

              <Text size="1" className="line-clamp-1">
                {getUsernameByUserId(userId)}
              </Text>
            </div>
          </div>
        )}

        {userDataState === UserDataState.Error ? (
          <IconButton
            className="shrink-0"
            tooltip={t(LangKey.Refresh)}
            onClick={onRefreshData}>
            <IoRefreshCircle className="size-5" />
          </IconButton>
        ) : (
          <IconButton
            className="shrink-0"
            tooltip={t(LangKey.Settings)}
            onClick={onOpenSettings}>
            <IoMdSettings className="size-5" />
          </IconButton>
        )}
      </div>
    </div>
  )
}

const UserBarPlaceHolder: FC = () => {
  return (
    <div className="flex gap-1.5">
      <div className="size-9 overflow-hidden rounded-full bg-neutral-400/50 dark:bg-neutral-700">
        <LoadingEffect />
      </div>

      <div className="flex flex-col gap-1">
        <div className="h-5 w-28 overflow-hidden rounded-xl bg-neutral-400/50 dark:bg-neutral-700">
          <LoadingEffect />
        </div>

        <div className="h-3.5 w-20 overflow-hidden rounded-lg bg-neutral-400/50 dark:bg-neutral-700">
          <LoadingEffect />
        </div>
      </div>
    </div>
  )
}

const UserBarError: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex size-9 items-center justify-center rounded-full bg-red-100">
        <IoAlertCircle className="text-red-500" />
      </div>

      <div className="flex flex-col gap-0.5 truncate">
        <Heading level="h6" className="text-red-500">
          {t(LangKey.ClientError)}
        </Heading>

        <Text size="1" className="truncate">
          {t(LangKey.PleaseRefresh)}
        </Text>
      </div>
    </div>
  )
}

export default UserBar
