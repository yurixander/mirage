import {FC, useState} from "react"
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
import {CreateSpaceButton} from "@/containers/NavigationSection/SpacesNavigation"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import AvatarUploader from "@/components/AvatarUploader"
import {Text} from "@/components/ui/typography"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"

const DevelopmentPreview: FC = () => {
  const [open, setIsOpen] = useState(false)
  const {t} = useTranslation()

  return (
    <Modal open={open} onOpenChange={setIsOpen}>
      <CreateSpaceButton onCreateSpace={() => setIsOpen(true)} />

      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t(LangKey.NewSpace)}</ModalTitle>

          <ModalDescription>{t(LangKey.CreateSpaceSpecInfo)}</ModalDescription>
        </ModalHeader>

        <ModalDescription className="flex flex-col gap-3">
          <div className="flex w-full gap-4">
            <AvatarUploader onAvatarUploaded={() => {}} />

            <div className="flex w-full max-w-64 flex-col gap-1">
              <Text size="2" className="flex items-center gap-1">
                * {t(LangKey.SpaceName)}
              </Text>

              <Input
                className="dark:bg-neutral-900"
                placeholder="Ej. Figma Community"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-3">
            <Text size="2">{t(LangKey.DescriptionOptional)}</Text>

            <Textarea placeholder={t(LangKey.SpaceDescriptionPlaceholder)} />
          </div>
        </ModalDescription>

        <ModalFooter>
          <ModalMoreInfo>{t(LangKey.NeedHelp)}</ModalMoreInfo>

          <ModalCancel>{t(LangKey.Cancel)}</ModalCancel>

          <ModalAction>{t(LangKey.CreateSpace)}</ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DevelopmentPreview
