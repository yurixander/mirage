import {useState, type FC} from "react"
import AvatarUploader from "./AvatarUploader"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Text} from "@/components/ui/typography"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {
  Modal,
  ModalCancel,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalMoreInfo,
} from "@/components/ui/modal"
import {CreationSpaceOptions} from "@/utils/util"
import {useToast} from "@/hooks/use-toast"

type CreateSpaceModalProps = {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onCreateSpace: (props: CreationSpaceOptions) => Promise<void>
  onUploadAvatar: (file: File) => Promise<string>
}

const CreateSpaceModal: FC<CreateSpaceModalProps> = ({
  open,
  onOpenChange,
  onCreateSpace,
  onUploadAvatar,
}) => {
  const {t} = useTranslation()
  const [spaceName, setSpaceName] = useState("")
  const [spaceDescription, setSpaceDescription] = useState<string>()
  const [spaceAvatarUrl, setSpaceAvatarUrl] = useState<string>()
  const {toast} = useToast()

  const makeSpace = (): void => {
    onCreateSpace({
      name: spaceName,
      topic: spaceDescription,
      mxcAvatarUrl: spaceAvatarUrl,
    })
      .then(() => {
        onOpenChange(false)

        toast({
          title: spaceName,
          description: "Se ha creado satisfactoriamente.",
        })
      })
      .catch((error: Error) => {
        toast({
          variant: "destructive",
          title: error.name,
          description: error.message,
        })
      })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t(LangKey.NewSpace)}</ModalTitle>

          <ModalDescription>{t(LangKey.CreateSpaceSpecInfo)}</ModalDescription>
        </ModalHeader>

        <ModalDescription className="flex flex-col gap-3">
          <div className="flex w-full gap-4">
            <AvatarUploader
              onMxcUrlResult={setSpaceAvatarUrl}
              onUploadAvatar={onUploadAvatar}
            />

            <div className="flex w-full max-w-64 flex-col gap-1">
              <Text size="2" className="flex items-center gap-1">
                * {t(LangKey.SpaceName)}
              </Text>

              <Input
                className="dark:bg-neutral-900"
                placeholder="Ej. Figma Community"
                value={spaceName}
                onChange={e => {
                  setSpaceName(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-3">
            <Text size="2">{t(LangKey.DescriptionOptional)}</Text>

            <Textarea
              placeholder={t(LangKey.SpaceDescriptionPlaceholder)}
              value={spaceDescription}
              onChange={e => {
                setSpaceDescription(e.target.value)
              }}
            />
          </div>
        </ModalDescription>

        <ModalFooter>
          <ModalMoreInfo>{t(LangKey.NeedHelp)}</ModalMoreInfo>

          <ModalCancel>{t(LangKey.Cancel)}</ModalCancel>

          <ModalAction
            onClick={e => {
              e.preventDefault()

              makeSpace()
            }}>
            {t(LangKey.CreateSpace)}
          </ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateSpaceModal
