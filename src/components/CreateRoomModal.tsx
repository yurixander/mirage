import type {FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import Dropdown, {type DropdownOption} from "./DropdownActions"
import {Visibility} from "matrix-js-sdk"
import {IoIosLock, IoMdGlobe} from "react-icons/io"
import InputSection from "./InputSection"
import SwitchButton from "./SwitchButton"
import {IoGlobe} from "react-icons/io5"
import useCreateRoom from "@/hooks/matrix/useCreateRoom"
import {FaHashtag} from "react-icons/fa6"
import Modal from "./Modal"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"

const CreateRoomModal: FC = () => {
  const {t} = useTranslation()

  const {
    isCreatingRoom,
    onCreateRoom,
    setEnableEncryption,
    setRoomAddress,
    setRoomDescription,
    setRoomName,
    setRoomVisibility,
    roomVisibility,
    enableEncryption,
    isDisabled,
    clearActiveModal,
    isValidAlias,
  } = useCreateRoom()

  const PRIVATE_DROPDOWN_OPTION: DropdownOption = {
    Icon: IoIosLock,
    text: t(LangKey.PrivateRoom),
  }

  const PUBLIC_DROPDOWN_OPTION: DropdownOption = {
    Icon: IoMdGlobe,
    text: t(LangKey.PublicRoom),
  }

  return (
    <Modal
      title={t(LangKey.CreateRoom)}
      actionText={t(LangKey.CreateRoom)}
      isDisabled={isDisabled || isValidAlias}
      isLoading={isCreatingRoom}
      onAccept={onCreateRoom}
      onClose={clearActiveModal}>
      <div className="flex flex-col gap-4 bg-white">
        <div className="flex flex-col gap-2">
          <InputSection
            title={`* ${t(LangKey.Name)}`}
            placeholder="Ej: Gaming Lovers"
            onValueChange={setRoomName}
          />

          <InputSection
            title={t(LangKey.DescriptionOptional)}
            onValueChange={setRoomDescription}
            placeholder={t(LangKey.RoomDescriptionPlaceholder)}
          />

          <div className="flex flex-col gap-1">
            <Typography variant={TypographyVariant.BodyMedium}>
              {t(LangKey.RoomPrivacy)}
            </Typography>

            <Dropdown
              options={[PRIVATE_DROPDOWN_OPTION, PUBLIC_DROPDOWN_OPTION]}
              initiallyOption={PRIVATE_DROPDOWN_OPTION}
              onOptionSelected={option => {
                if (option === PRIVATE_DROPDOWN_OPTION) {
                  setRoomVisibility(Visibility.Private)

                  return
                }

                setRoomVisibility(Visibility.Public)
              }}
            />
          </div>
        </div>

        {roomVisibility === Visibility.Private ? (
          <div className="flex flex-col gap-2">
            <Typography className="text-black" variant={TypographyVariant.Body}>
              {t(LangKey.CreateRoomInvitedTextAssistance)}
            </Typography>

            <div className="flex justify-between">
              <div className="flex max-w-64 flex-col">
                <Typography
                  className="font-medium text-black"
                  variant={TypographyVariant.Body}>
                  {t(LangKey.TurnOnEndToEndEncryption)}
                </Typography>

                <Typography variant={TypographyVariant.BodySmall}>
                  {t(LangKey.CreateRoomEncryptionEnableTextAssistance)}
                </Typography>
              </div>

              <SwitchButton
                isInitiallySelected={enableEncryption}
                onSelectionChange={setEnableEncryption}
              />
            </div>
          </div>
        ) : (
          <InputSection
            className="max-w-48"
            title={`* ${t(LangKey.RoomAddress)}`}
            titleIcon={IoGlobe}
            icon={FaHashtag}
            placeholder="p.j  my-room"
            onValueChange={setRoomAddress}
          />
        )}
      </div>
    </Modal>
  )
}

export default CreateRoomModal
