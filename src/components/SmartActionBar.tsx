import SmartAction from "@/components/SmartAction"
import {useClientStore} from "@/hooks/matrix/useConnection"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/utils/lang"
import {SyncState} from "matrix-js-sdk"
import {type FC} from "react"
import {IoMdMedical} from "react-icons/io"
import {IoAccessibility, IoContrast, IoGlobe} from "react-icons/io5"

const syncStateText: {[key in SyncState]: LangKey} = {
  [SyncState.Error]: LangKey.SyncError,
  [SyncState.Prepared]: LangKey.Ready,
  [SyncState.Stopped]: LangKey.Disconnected,
  [SyncState.Syncing]: LangKey.Syncing,
  [SyncState.Catchup]: LangKey.CatchingUp,
  [SyncState.Reconnecting]: LangKey.Reconnecting,
}

const SmartActionBar: FC<{className?: string}> = ({className}) => {
  const {syncState} = useClientStore()
  const {t} = useTranslation()

  return (
    <div className={className}>
      <SmartAction
        Icon={IoMdMedical}
        text={t(LangKey.QuickMenu)}
        onClick={() => {
          /* TODO: Handle `Quick menu` click. */
        }}
      />

      <SmartAction
        Icon={IoAccessibility}
        text={t(LangKey.Accessibility)}
        onClick={() => {
          /* TODO: Handle `Accessibility` click. */
        }}
      />

      <SmartAction
        Icon={IoContrast}
        text={t(LangKey.SwitchTheme)}
        onClick={() => {
          /* TODO: Handle `Switch theme` click. */
        }}
      />

      <SmartAction
        Icon={IoGlobe}
        text={
          syncState === null ? t(LangKey.Waiting) : t(syncStateText[syncState])
        }
        onClick={() => {}}
      />
    </div>
  )
}

export default SmartActionBar
