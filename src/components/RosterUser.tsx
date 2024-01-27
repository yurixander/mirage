import UserProfile, {type UserProfileProps} from "./UserProfile"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type RosterUserProps = {
  userProfileProps: UserProfileProps
  onClick: () => void
}

const RosterUser: FC<RosterUserProps> = ({userProfileProps, onClick}) => {
  const focusVisible =
    "focus-visible:outline-none focus-visible:border-2 focus-visible:border-solid focus-visible:border-outlineTab focus-visible:rounded-5 focus-visible:transition focus-visible:duration-150"

  return (
    <div
      className={twMerge("w-max cursor-pointer p-5px", focusVisible)}
      tabIndex={0}>
      <UserProfile {...userProfileProps} />
    </div>
  )
}

export default RosterUser
