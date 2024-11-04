import {FC, useState} from "react"
import {
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalMoreInfo,
  ModalTitle,
} from "@/components/ui/modal"
import {Heading, Text} from "@/components/ui/typography"
import {Input} from "@/components/ui/input"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Switch} from "@/components/ui/switch"
import {Visibility} from "matrix-js-sdk"
import {RoomCreationProps} from "@/utils/rooms"

const ROOM_PUBLIC_PRIVACY_KEY = Visibility.Public
const ROOM_PRIVATE_PRIVACY_KEY = Visibility.Private

type CreateRoomModalProps = {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onCreateRoom: (props: RoomCreationProps) => Promise<void>
}

const CreateRoomModal: FC<CreateRoomModalProps> = ({
  onCreateRoom,
  open,
  onOpenChange,
}) => {
  const {t} = useTranslation()
  const [enableEncryption, setEnableEncryption] = useState(false)
  const [roomName, setRoomName] = useState("")
  const [roomDescription, setRoomDescription] = useState<string>()
  const [roomAddress, setRoomAddress] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const [privacyMode, setPrivacyMode] = useState<string>(
    ROOM_PRIVATE_PRIVACY_KEY
  )

  const makeRoom = (): void => {
    if (isLoading) {
      throw new Error("Ya hay un proceso en curso")
    }

    setIsLoading(true)

    void onCreateRoom({
      name: roomName,
      description: roomDescription,
      privacy: privacyMode,
      enableEncryption: enableEncryption,
      address: roomAddress,
    })
      .then(() => {
        onOpenChange(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t(LangKey.CreateRoom)}</ModalTitle>

          <ModalDescription>
            {t(LangKey.CreateRoomModalSubtitle)}
          </ModalDescription>
        </ModalHeader>

        <ModalDescription className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Text as="label" size="2" htmlFor="room_name">
              * {t(LangKey.Name)}
            </Text>

            <Input
              id="room_name"
              placeholder="Ej: Gaming Lovers"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Text as="label" size="2" htmlFor="room_description">
              {t(LangKey.DescriptionOptional)}
            </Text>

            <Input
              id="room_description"
              placeholder={t(LangKey.RoomDescriptionPlaceholder)}
              value={roomDescription}
              onChange={e => setRoomDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Text as="label" size="2" htmlFor="room_privacy">
              {t(LangKey.RoomPrivacy)}
            </Text>

            <Select value={privacyMode} onValueChange={setPrivacyMode}>
              <SelectTrigger className="w-72">
                <SelectValue placeholder={t(LangKey.RoomPrivacy)} />
              </SelectTrigger>

              <SelectContent
                id="room_privacy"
                onCloseAutoFocus={e => e.preventDefault()}>
                <SelectItem value={ROOM_PRIVATE_PRIVACY_KEY}>
                  {t(LangKey.PrivateRoom)}
                </SelectItem>

                <SelectItem value={ROOM_PUBLIC_PRIVACY_KEY}>
                  {t(LangKey.PublicRoom)}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {privacyMode === ROOM_PRIVATE_PRIVACY_KEY ? (
            <div className="flex flex-col gap-3">
              <Text size="2">{t(LangKey.CreateRoomInvitedTextAssistance)}</Text>

              <div className="flex flex-row items-center justify-between">
                <div className="flex max-w-96 flex-col">
                  <Heading level="h6">
                    {t(LangKey.TurnOnEndToEndEncryption)}
                  </Heading>

                  <Text size="2">
                    {t(LangKey.CreateRoomEncryptionEnableTextAssistance)}
                  </Text>
                </div>

                <Switch
                  checked={enableEncryption}
                  onCheckedChange={setEnableEncryption}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <Text as="label" size="2" htmlFor="room_address">
                * {t(LangKey.RoomAddress)}
              </Text>

              <Input
                id="room_address"
                placeholder="p.j  my-room"
                value={roomAddress}
                onChange={e => setRoomAddress(e.target.value)}
              />
            </div>
          )}
        </ModalDescription>

        <ModalFooter>
          <ModalMoreInfo>Need help?</ModalMoreInfo>

          <ModalAction
            disabled={isLoading}
            onClick={e => {
              e.preventDefault()

              makeRoom()
            }}>
            {t(LangKey.CreateRoom)}
          </ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateRoomModal
