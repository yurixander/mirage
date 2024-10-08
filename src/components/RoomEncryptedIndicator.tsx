import {type FC} from "react"
import {IoLockClosed} from "react-icons/io5"
import Typography from "./Typography"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"

const RoomEncryptedIndicator: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="z-20 flex w-full items-center justify-center p-2">
      <div className="flex animate-pulse items-center justify-center gap-1 rounded-xl border bg-white px-10">
        <div>
          <IoLockClosed className="text-slate-500" />
        </div>

        <Typography>{t(LangKey.RoomEncrypted)}</Typography>
      </div>
    </div>
  )
}

export default RoomEncryptedIndicator
