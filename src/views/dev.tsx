import {type FC} from "react"
import {useTranslation} from "react-i18next"

const DevelopmentPreview: FC = () => {
  const {t} = useTranslation()

  return (
    <>
      <span>{t("Create Room")}</span>
    </>
  )
}

export default DevelopmentPreview
