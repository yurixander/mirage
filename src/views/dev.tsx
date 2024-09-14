import useTranslation from "@/hooks/util/useTranslation"
import {type FC} from "react"

const DevelopmentPreview: FC = () => {
  const {t} = useTranslation()

  return (
    <>
      <span>{}</span>
    </>
  )
}

export default DevelopmentPreview
