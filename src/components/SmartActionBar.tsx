import SmartAction from "@/components/SmartAction"
import useConnection from "@/hooks/matrix/useConnection"
import {SyncState} from "matrix-js-sdk"
import {type FC} from "react"
import {IoMdMedical} from "react-icons/io"
import {IoAccessibility, IoContrast, IoGlobe} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

const syncStateText: {[key in SyncState]: string} = {
  [SyncState.Error]: "Sync error",
  [SyncState.Prepared]: "Ready",
  [SyncState.Stopped]: "Disconnected",
  [SyncState.Syncing]: "Syncing",
  [SyncState.Catchup]: "Catching up",
  [SyncState.Reconnecting]: "Reconnecting",
}

const SmartActionBar: FC<{className?: string}> = ({className}) => {
  const {syncState} = useConnection()

  return (
    <div
      className={twMerge(
        "flex items-center justify-end gap-4 border-t border-t-stone-200 bg-neutral-50 p-1 pr-2",
        className
      )}>
      <SmartAction
        Icon={IoMdMedical}
        text="Quick menu"
        onClick={() => {
          /* TODO: Handle `Quick menu` click. */
        }}
      />

      <SmartAction
        Icon={IoAccessibility}
        text="Accessibility"
        onClick={() => {
          /* TODO: Handle `Accessibility` click. */
        }}
      />

      <SmartAction
        Icon={IoContrast}
        text="Switch theme"
        onClick={() => {
          /* TODO: Handle `Switch theme` click. */
        }}
      />

      <SmartAction
        Icon={IoGlobe}
        text={syncState === null ? "Waiting" : syncStateText[syncState]}
        onClick={() => {}}
      />
    </div>
  )
}

export default SmartActionBar
