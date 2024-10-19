import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import type {FC} from "react"
import {IoLockClosed} from "react-icons/io5"
import Typography from "./Typography"

const RoomEncryptedIndicator: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="z-20 flex w-full items-center justify-center p-2">
      <div className="flex items-center justify-center gap-1 rounded-xl border bg-slate-50 px-10 dark:border-slate-500 dark:bg-slate-900">
        <div>
          <IoLockClosed className="text-slate-500 dark:text-slate-300" />
        </div>

        <Typography className="dark:text-slate-300">
          {t(LangKey.RoomEncrypted)}
        </Typography>
      </div>
    </div>
  )
}

export default RoomEncryptedIndicator
