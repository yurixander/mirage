import "../styles/UserProfile.sass"

export enum UserStatus {
    Online,
    Offline
}

export type UserProfile = {
    avatarUrl: string,
    username: string,
    displayName: string,
    displayNameColor: string,
    status: UserStatus
}

export default function UserProfile(props: UserProfile) {
  return (
    <div className="UserProfile">

    </div>
  )
}