import SmartAction from "@/components/SmartAction"
import {useClientStore} from "@/hooks/matrix/useConnection"
import {t} from "i18next"
import {SyncState} from "matrix-js-sdk"
import {type FC} from "react"
import {useTranslation} from "react-i18next"
import {IoMdMedical} from "react-icons/io"
import {IoAccessibility, IoContrast, IoGlobe} from "react-icons/io5"

const syncStateText: {[key in SyncState]: string} = {
  [SyncState.Error]: t("Sync error"),
  [SyncState.Prepared]: t("Ready"),
  [SyncState.Stopped]: t("Disconnected"),
  [SyncState.Syncing]: t("Syncing"),
  [SyncState.Catchup]: t("Catching up"),
  [SyncState.Reconnecting]: t("Reconnecting"),
}

const SmartActionBar: FC<{className?: string}> = ({className}) => {
  const {syncState} = useClientStore()
  const {t} = useTranslation()

  return (
    <div className={className}>
      <SmartAction
        Icon={IoMdMedical}
        text={t("Quick menu")}
        onClick={() => {
          /* TODO: Handle `Quick menu` click. */
        }}
      />

      <SmartAction
        Icon={IoAccessibility}
        text={t("Accessibility")}
        onClick={() => {
          /* TODO: Handle `Accessibility` click. */
        }}
      />

      <SmartAction
        Icon={IoContrast}
        text={t("Switch theme")}
        onClick={() => {
          /* TODO: Handle `Switch theme` click. */
        }}
      />

      <SmartAction
        Icon={IoGlobe}
        text={syncState === null ? t("Waiting") : syncStateText[syncState]}
        onClick={() => {}}
      />
    </div>
  )
}

export default SmartActionBar
