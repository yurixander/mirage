import {type FC} from "react"
import Typography, {TypographyVariant} from "@/components/Typography"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/utils/lang"

const RoomNotFoundSplash: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-stone-200">
      <Typography variant={TypographyVariant.HeadingLarge}>
        {t(LangKey.RoomNotFound)}
      </Typography>

      <Typography>{t(LangKey.RoomNotFoundDescription)}</Typography>
    </div>
  )
}

export default RoomNotFoundSplash
