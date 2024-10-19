import AvatarImage, {AvatarType} from "@/components/AvatarImage"
import Typography, {TypographyVariant} from "@/components/Typography"
import {Button} from "@/components/ui/button"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {getImageUrl} from "@/utils/util"
import {type FC, useMemo, useState} from "react"
import RoomNotFoundSplash from "./RoomNotFoundSplash"

enum ActionTypes {
  Join,
  Leave,
}

const RoomInvitedSplash: FC<{roomId: string | null}> = ({roomId}) => {
  const client = useMatrixClient()
  const {t} = useTranslation()
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
          {t(LangKey.YouHaveBeenInvitedToThisRoom)}
        </Typography>

        <div className="mt-1 flex w-full gap-1">
          <Button
            disabled={
              client === null ||
              actionLoading === ActionTypes.Join ||
              actionLoading === ActionTypes.Leave
            }
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

                  setError(t(LangKey.RejectInvitationError))
                  setActionLoading(null)
                })
            }}>
            {t(LangKey.Reject)}
          </Button>

          <Button
            disabled={
              client === null ||
              actionLoading === ActionTypes.Leave ||
              actionLoading === ActionTypes.Join
            }
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

                  setError(t(LangKey.JoiningRoomError))
                  setActionLoading(null)
                })
            }}>
            {t(LangKey.Accept)}
          </Button>
        </div>
      </div>

      {error !== null && <Typography className="mt-4">{error}</Typography>}
    </div>
  )
}

export default RoomInvitedSplash
