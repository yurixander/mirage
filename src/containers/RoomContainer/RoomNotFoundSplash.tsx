import {type FC} from "react"
import Typography, {TypographyVariant} from "@/components/Typography"
import {useTranslation} from "react-i18next"

const RoomNotFoundSplash: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-stone-200">
      <Typography variant={TypographyVariant.HeadingLarge}>
        {t("Room Not Found")}
      </Typography>

      <Typography>
        {t("You not have access to this room or this room not found.")}
      </Typography>
    </div>
  )
}

export default RoomNotFoundSplash
