import {useState, type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import InputSection from "./InputSection"
import {createSpace} from "@/utils/util"
import InputArea from "./InputArea"
import {EventType} from "matrix-js-sdk"
import AvatarUploader from "./AvatarUploader"
import useActiveModalStore from "@/hooks/util/useActiveModal"
import Modal from "./Modal"
import useMatrixClient from "@/hooks/matrix/useMatrixClient"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"

const CreateSpaceModal: FC = () => {
  const client = useMatrixClient()
  const [spaceName, setSpaceName] = useState("")
  const [spaceDescription, setSpaceDescription] = useState("")
  const [spaceAvatarUrl, setSpaceAvatarUrl] = useState<string>()
  const [isCreatingSpace, setIsCreatingSpace] = useState(false)
  const {clearActiveModal} = useActiveModalStore()
  const {t} = useTranslation()

  const onCreateSpace = (): void => {
    if (client === null) {
      return
    }

    setIsCreatingSpace(true)

    void createSpace(client, {
      name: spaceName,
      topic: spaceDescription,
      initial_state: [
        {
          type: EventType.RoomAvatar,
          content: {
            url: spaceAvatarUrl,
          },
        },
      ],
    })
      .then(_roomId => {
        // TODO: Send here notification that the room has been created.

        setIsCreatingSpace(false)
        clearActiveModal()
      })
      .catch(_error => {
        // TODO: Send here notification that the room has not been created.

        setIsCreatingSpace(false)
      })
  }

  return (
    <Modal
      title={t(LangKey.NewSpace)}
      actionText={t(LangKey.CreateSpace)}
      isLoading={isCreatingSpace}
      isDisabled={client === null || spaceName.length <= 0}
      onAccept={onCreateSpace}
      onClose={clearActiveModal}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <AvatarUploader onAvatarUploaded={setSpaceAvatarUrl} />

          <div className="flex flex-col">
            <Typography
              className="font-bold text-black"
              variant={TypographyVariant.Heading}>
              {t(LangKey.CreateSpace)}
            </Typography>

            <Typography variant={TypographyVariant.BodySmall}>
              {t(LangKey.CreateSpaceSpecInfo)}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <InputSection
            title={`* ${t(LangKey.SpaceName)}`}
            placeholder="Ej. Figma Community"
            onValueChange={setSpaceName}
          />

          {/* TODO: This input description prefer use `text-area` */}
          <div className="flex flex-col gap-1">
            <Typography variant={TypographyVariant.BodySmall}>
              {t(LangKey.DescriptionOptional)}
            </Typography>

            <InputArea
              className="w-full"
              onValueChange={setSpaceDescription}
              initialValue={spaceDescription}
              placeholder={t(LangKey.SpaceDescriptionPlaceholder)}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CreateSpaceModal
