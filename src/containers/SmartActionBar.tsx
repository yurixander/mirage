import SmartAction from "@/components/SmartAction"
import useConnection from "@/hooks/matrix/useConnection"
import {SyncState} from "matrix-js-sdk"
import {type FC} from "react"
import {IoGlobe} from "react-icons/io5"

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
    <div className="flex flex-row gap-2">
      <SmartAction
        Icon={IoGlobe}
        text={getSyncStateText(syncState)}
        onClick={() => {}}
      />
    </div>
  )
}

export default SmartActionBar
