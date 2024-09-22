import {type FC} from "react"
import {IoLockClosed} from "react-icons/io5"
import Typography from "./Typography"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"

const RoomEncryptedIndicator: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="flex w-full items-center justify-center gap-1 bg-slate-50 p-2">
      <div>
        <IoLockClosed className="text-slate-500" />
      </div>

      <Typography>{t(LangKey.RoomEncrypted)}</Typography>
    </div>
  )
}

export default RoomEncryptedIndicator
