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

const PRIVATE_DROPDOWN_OPTION: DropdownOption = {
  Icon: IoIosLock,
  text: "Private Room",
}

const PUBLIC_DROPDOWN_OPTION: DropdownOption = {
  Icon: IoMdGlobe,
  text: "Public Room",
}

const CreateRoomModal: FC = () => {
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

  return (
    <Modal
      title="Create Room"
      actionText="Create Room"
      isDisabled={isDisabled || isValidAlias}
      isLoading={isCreatingRoom}
      onAccept={onCreateRoom}
      onClose={clearActiveModal}>
      <div className="flex flex-col gap-4 bg-white">
        <div className="flex flex-col gap-2">
          <InputSection
            title="* Name"
            placeholder="Ej: Gaming Lovers"
            onValueChange={setRoomName}
          />

          <InputSection
            title="Description (optional)"
            placeholder="A brief description about the purpose of this room"
            onValueChange={setRoomDescription}
          />

          <div className="flex flex-col gap-1">
            <Typography variant={TypographyVariant.BodyMedium}>
              Room Privacy
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
              Only those who are invited will be able to find and join this
              room. You can change this at any time from the room settings
            </Typography>

            <div className="flex justify-between">
              <div className="flex max-w-64 flex-col">
                <Typography
                  className="font-medium text-black"
                  variant={TypographyVariant.Body}>
                  Turn on end-to-end encryption
                </Typography>

                <Typography variant={TypographyVariant.BodySmall}>
                  You won't be able to turn it off later. Bridges and most of
                  robots still won't work.
                </Typography>
              </div>

              <SwitchButton
                isInitiallySelected={enableEncryption}
                onSelectionChange={setEnableEncryption}
              />
            </div>
          </div>
        ) : (
          // TODO: Put new constraint for invalid alias.
          <InputSection
            className="max-w-48"
            title="* Room Address"
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
