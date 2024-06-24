import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import Button, {ButtonVariant} from "@/components/Button"
import Typography, {TypographyVariant} from "@/components/Typography"
import {type FC} from "react"
import RoomNotFoundSplash from "./RoomNotFoundSplash"

const RoomInvitedSplash: FC<{roomId: string | null}> = ({roomId}) => {
  return roomId === null ? (
    <RoomNotFoundSplash />
  ) : (
    <div className="flex size-full items-center justify-center border-r border-stone-200">
      <AvatarImage
        isRounded
        avatarType={AvatarType.ProfileBar}
        displayName="Emerald Branch"
      />

      <Typography variant={TypographyVariant.Heading}>Figma Utils</Typography>

      <Typography variant={TypographyVariant.Body}>
        You have been invited to this room
      </Typography>

      <div className="flex gap-1">
        <Button
          label="Reject"
          onClick={() => {
            throw new Error("Function not implemented.")
          }}
        />

        <Button
          variant={ButtonVariant.Primary}
          label="Accept"
          onClick={() => {
            throw new Error("Function not implemented.")
          }}
        />
      </div>
    </div>
  )
}

export default RoomInvitedSplash
