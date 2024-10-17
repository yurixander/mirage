import {type FC} from "react"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "@/components/ui/typography"

const RoomNotFoundSplash: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950">
      <Heading level="h1" align="center">
        {t(LangKey.RoomNotFound)}
      </Heading>

      <Text align="center" size="4">
        {t(LangKey.RoomNotFoundDescription)}
      </Text>
    </div>
  )
}

export default RoomNotFoundSplash
