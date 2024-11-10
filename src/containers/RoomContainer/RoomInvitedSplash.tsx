import AvatarImage, {AvatarSize, AvatarType} from "@/components/AvatarImage"
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal"
import {Text} from "@/components/ui/typography"
import ValueStateHandler from "@/components/ValueStateHandler"
import {useToast} from "@/hooks/use-toast"
import useTranslation from "@/hooks/util/useTranslation"
import {ValueState} from "@/hooks/util/useValueState"
import {LangKey} from "@/lang/allKeys"
import {t} from "@/utils/lang"
import React, {FC, useState} from "react"
import {IoShield} from "react-icons/io5"
import {LiaSlackHash} from "react-icons/lia"

class RoomInvitedError extends Error {
  constructor(message: string, name?: string) {
    super()

    super.message = message
    super.name = name ?? t(LangKey.RoomInvitedError)
  }
}

type RoomDetailOwner = {
  displayName: string
  avatarUrl?: string
}

export type RoomDetailPreview = {
  name: string
  detailChips: string[]
  avatarUrl?: string
  topic?: string
  owners?: RoomDetailOwner[]
}

type RoomInvitedSplashProps = {
  roomDetailPreview: ValueState<RoomDetailPreview>
  onJoinRoom: () => Promise<void>
  onClose: () => void
}

const DEFAULT_JOIN_ROOM_ERROR = new RoomInvitedError(
  t(LangKey.DefaultJoinRoomErrorDescription)
)

const RoomInvitedSplash: FC<RoomInvitedSplashProps> = ({
  onClose,
  onJoinRoom,
  roomDetailPreview,
}) => {
  const [open, setIsOpen] = useState(true)
  const [isJoiningRoom, setIsJoiningRoom] = useState(false)
  const {toast} = useToast()
  const {t} = useTranslation()

  const joinAction = (): void => {
    setIsJoiningRoom(true)

    onJoinRoom()
      .then(() => {
        setIsJoiningRoom(false)

        toast({
          title: t(LangKey.TaskCompleted),
          description: t(LangKey.JoinRoomCompleted),
        })

        onClose()
      })
      .catch((error: Error) => {
        const secureError =
          error instanceof RoomInvitedError ? error : DEFAULT_JOIN_ROOM_ERROR

        toast({
          title: secureError.name,
          description: secureError.message,
          variant: "destructive",
        })
      })
  }

  return (
    <Modal
      open={open}
      onOpenChange={open => {
        // Block the closing of the modal if you are entering the room.
        if (!open && isJoiningRoom) {
          return
        }

        setIsOpen(false)
        onClose()
      }}>
      <ModalContent>
        <ValueStateHandler
          value={roomDetailPreview}
          loading={<RoomInvitedModalPlaceholder />}
          error={error => <RoomInvitedModalError error={error} />}>
          {({name, detailChips, avatarUrl, owners, topic}) => (
            <>
              <ModalHeader className="flex flex-row gap-3">
                <AvatarImage
                  isRounded
                  avatarUrl={avatarUrl}
                  avatarType={AvatarType.Profile}
                  avatarSize={AvatarSize.Large}
                  displayName={name}
                />

                <div className="flex flex-col gap-1">
                  <ModalTitle>{name}</ModalTitle>

                  <div className="flex flex-wrap gap-1 pr-1">
                    {detailChips.map((detailChip, index) => (
                      <RoomDetailChip key={index}>{detailChip}</RoomDetailChip>
                    ))}
                  </div>
                </div>
              </ModalHeader>

              <ModalDescription className="flex flex-col gap-y-5">
                {topic !== undefined && (
                  <div className="flex flex-col gap-0.5">
                    <Text
                      size="2"
                      weight="medium"
                      className="flex items-center gap-1 uppercase text-neutral-500">
                      <LiaSlackHash />
                      {t(LangKey.Topic)}
                    </Text>

                    <Text>{topic}</Text>
                  </div>
                )}

                {owners !== undefined && (
                  <div className="flex flex-col gap-1.5">
                    <Text
                      size="2"
                      weight="medium"
                      className="flex items-center gap-1 uppercase text-neutral-500">
                      <IoShield />
                      {t(LangKey.RoomOwners)}
                    </Text>

                    <div className="flex flex-row flex-wrap gap-1.5">
                      {owners.map((owner, index) => (
                        <AvatarImage
                          isRounded
                          key={index}
                          avatarType={AvatarType.Profile}
                          avatarSize={AvatarSize.Small}
                          avatarUrl={owner.avatarUrl}
                          displayName={owner.displayName}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </ModalDescription>

              <ModalFooter containDots={false}>
                <ModalCancel>{t(LangKey.Cancel)}</ModalCancel>

                <ModalAction
                  disabled={isJoiningRoom}
                  onClick={async e => {
                    e.preventDefault()

                    joinAction()
                  }}>
                  {t(LangKey.JoinRoom)}
                </ModalAction>
              </ModalFooter>
            </>
          )}
        </ValueStateHandler>
      </ModalContent>
    </Modal>
  )
}

const RoomDetailChip: FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <Text
      size="2"
      weight="regular"
      className="w-max rounded-md border border-b-2 border-neutral-400 bg-neutral-200 px-2">
      {children}
    </Text>
  )
}

const DEFAULT_PREVIEW_INVITED_ERROR = new RoomInvitedError(
  t(LangKey.DefaultPreviewInvitedErrorDescription)
)

const RoomInvitedModalError: FC<{error: Error}> = ({error}) => {
  const {t} = useTranslation()

  const {name, message} =
    error instanceof RoomInvitedError ? error : DEFAULT_PREVIEW_INVITED_ERROR

  return (
    <>
      <ModalHeader>
        <ModalTitle>{name}</ModalTitle>
      </ModalHeader>

      <ModalDescription className="text-base">{message}</ModalDescription>

      <ModalFooter containDots={false}>
        <ModalAction>{t(LangKey.Accept)}</ModalAction>
      </ModalFooter>
    </>
  )
}

const RoomInvitedModalPlaceholder: FC = () => {
  const {t} = useTranslation()

  return (
    <>
      <ModalHeader className="flex animate-pulse flex-row gap-3">
        <div className="size-14 rounded-full bg-neutral-500" />

        <div className="flex flex-col gap-1">
          <div className="h-7 w-36 rounded-full bg-neutral-500" />

          <div className="flex flex-wrap gap-1 pr-1">
            <div className="h-5 w-14 rounded-full bg-neutral-500" />

            <div className="h-5 w-20 rounded-full bg-neutral-500" />

            <div className="h-5 w-14 rounded-full bg-neutral-500" />
          </div>
        </div>
      </ModalHeader>

      <ModalDescription className="flex animate-pulse flex-col gap-y-5">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-20 rounded-full bg-neutral-500" />

          <div className="h-20 w-full rounded-lg bg-neutral-500" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-5 w-20 rounded-full bg-neutral-500" />

          <div className="flex gap-1.5">
            {Array.from({length: 7}).map((_, i) => (
              <div key={i} className="size-8 rounded-full bg-neutral-500" />
            ))}
          </div>
        </div>
      </ModalDescription>

      <ModalFooter containDots={false}>
        <ModalCancel>{t(LangKey.Cancel)}</ModalCancel>

        <ModalAction disabled>{t(LangKey.JoinRoom)}</ModalAction>
      </ModalFooter>
    </>
  )
}

export default RoomInvitedSplash
