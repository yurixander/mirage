import {type FC} from "react"
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
import {useTranslation} from "react-i18next"

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
    text: t("Private Room"),
  }

  const PUBLIC_DROPDOWN_OPTION: DropdownOption = {
    Icon: IoMdGlobe,
    text: t("Public Room"),
  }

  return (
    <Modal
      title={t("Create Room")}
      actionText={t("Create Room")}
      isDisabled={isDisabled || isValidAlias}
      isLoading={isCreatingRoom}
      onAccept={onCreateRoom}
      onClose={clearActiveModal}>
      <div className="flex flex-col gap-4 bg-white">
        <div className="flex flex-col gap-2">
          <InputSection
            title={`* ${t("Name")}`}
            placeholder="Ej: Gaming Lovers"
            onValueChange={setRoomName}
          />

          <InputSection
            title={t("Description (optional)")}
            onValueChange={setRoomDescription}
            placeholder={t("Room description placeholder")}
          />

          <div className="flex flex-col gap-1">
            <Typography variant={TypographyVariant.BodyMedium}>
              {t("Room Privacy")}
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
              {t("Create Room invited text assistance")}
            </Typography>

            <div className="flex justify-between">
              <div className="flex max-w-64 flex-col">
                <Typography
                  className="font-medium text-black"
                  variant={TypographyVariant.Body}>
                  {t("Turn on end-to-end encryption")}
                </Typography>

                <Typography variant={TypographyVariant.BodySmall}>
                  {t("Create Room encryption enable text assistance")}
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
            title={`* ${t("Room Address")}`}
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
