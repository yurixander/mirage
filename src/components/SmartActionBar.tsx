import SmartAction from "@/components/SmartAction"
import useConnection from "@/hooks/matrix/useConnection"
import {SyncState} from "matrix-js-sdk"
import {type FC} from "react"
import {IoMdMedical} from "react-icons/io"
import {IoAccessibility, IoContrast, IoGlobe} from "react-icons/io5"

function getSyncStateText(syncState: SyncState | null) {
  // Haven't started initial connection yet.
  if (syncState === null) {
    return "Waiting"
  }

  switch (syncState) {
    case SyncState.Syncing: {
      return "Syncing"
    }
    case SyncState.Error: {
      return "Sync error"
    }
    case SyncState.Prepared: {
      return "Ready"
    }
    case SyncState.Catchup: {
      return "Catching up"
    }
    case SyncState.Stopped: {
      return "Disconnected"
    }
    case SyncState.Reconnecting: {
      return "Reconnecting"
    }
  }
}

const SmartActionBar: FC = () => {
  const {syncState} = useConnection()

  return (
    <div className="flex items-center justify-end gap-4 border-t border-t-stone-200 bg-neutral-50 p-1 pr-2">
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
        text={getSyncStateText(syncState)}
        onClick={() => {}}
      />
    </div>
  )
}

export default SmartActionBar
