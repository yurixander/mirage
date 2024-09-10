import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import Button, {ButtonVariant} from "@/components/Button"
import Typography, {TypographyVariant} from "@/components/Typography"
import {useMemo, useState, type FC} from "react"
import RoomNotFoundSplash from "./RoomNotFoundSplash"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import {getImageUrl} from "@/utils/util"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import {useTranslation} from "react-i18next"

enum ActionTypes {
  Join,
  Leave,
}

const RoomInvitedSplash: FC<{roomId: string | null}> = ({roomId}) => {
  const client = useMatrixClient()
  const {t} = useTranslation("roomContainer")
  const {setActiveRoomId, clearActiveRoomId} = useActiveRoomIdStore()
  const [actionLoading, setActionLoading] = useState<ActionTypes | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Room data
  const roomData = useMemo(() => {
    if (client === null || roomId === null) {
      return
    }

    const room = client.getRoom(roomId)

    if (room === null) {
      // TODO: Show toast when error happens.

      return
    }

    return {
      roomName: room.name,
      roomAvatarUrl: getImageUrl(room.getMxcAvatarUrl(), client),
    }
  }, [client, roomId])

  return roomId === null || roomData === undefined ? (
    <RoomNotFoundSplash />
  ) : (
    <div className="flex size-full items-center justify-center border-r border-stone-200">
      <div className="flex max-w-max flex-col items-center gap-2">
        <AvatarImage
          isRounded
          avatarType={AvatarType.ProfileBar}
          displayName={roomData.roomName}
          avatarUrl={roomData.roomAvatarUrl}
        />

        <Typography variant={TypographyVariant.Heading}>
          {roomData.roomName}
        </Typography>

        <Typography variant={TypographyVariant.Body}>
          {t("You have been invited to this room")}
        </Typography>

        <div className="mt-1 flex w-full gap-1">
          <Button
            className="w-full"
            label={t("common:Reject")}
            isDisabled={client === null || actionLoading === ActionTypes.Join}
            isLoading={actionLoading === ActionTypes.Leave}
            onClick={() => {
              if (client === null) {
                return
              }

              setError(null)
              setActionLoading(ActionTypes.Leave)

              void client
                .leave(roomId)
                .then(() => {
                  setActionLoading(null)
                  clearActiveRoomId()
                })
                .catch(_error => {
                  // TODO: Show toast when error happens.

                  setError(t("Reject invitation error"))
                  setActionLoading(null)
                })
            }}
          />

          <Button
            className="w-full"
            isDisabled={client === null || actionLoading === ActionTypes.Leave}
            isLoading={actionLoading === ActionTypes.Join}
            variant={ButtonVariant.Primary}
            label={t("common:Accept")}
            onClick={() => {
              if (client === null) {
                return
              }

              setError(null)
              setActionLoading(ActionTypes.Join)

              void client
                .joinRoom(roomId)
                .then(room => {
                  setActionLoading(null)

                  clearActiveRoomId()
                  setActiveRoomId(room.roomId)
                })
                .catch(_error => {
                  // TODO: Show toast when error happens.

                  setError(t("Joining room error"))
                  setActionLoading(null)
                })
            }}
          />
        </div>
      </div>

      {error !== null && <Typography className="mt-4">{error}</Typography>}
    </div>
  )
}

export default RoomInvitedSplash
