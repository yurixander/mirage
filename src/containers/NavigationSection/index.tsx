import {type FC} from "react"
import SidebarActions from "./SidebarActions"
import SpaceList from "./SpaceList"
import UserBar from "./UserBar"
import useSidebarActions, {SidebarModals} from "./hooks/useSidebarActions"
import SidebarModalsHandler from "./modals/SidebarModalsHandler"
import useGlobalEventListeners from "@/hooks/matrix/useGlobalEventListeners"

const NavigationSection: FC = () => {
  const {onLogout, setActiveSidebarModal} = useSidebarActions()
  const {containsUnreadNotifications} = useGlobalEventListeners()

  return (
    <>
      <SidebarModalsHandler />

      <div className="flex size-full max-w-52 flex-col gap-1 border border-slate-300 bg-slate-100">
        <div className="max-h-12 border-b border-b-slate-300">
          {/* TODO: Place the Server dropdown component here. */}
        </div>

        <SpaceList className="p-4" />

        <SidebarActions
          className="mt-auto p-4"
          notificationsCount={containsUnreadNotifications}
          // TODO: Handle other events.
          onCalls={() => {}}
          onSearch={() => {}}
          onExit={onLogout}
          onNotification={() => {
            setActiveSidebarModal(SidebarModals.Notifications)
          }}
          onDirectMessages={() => {
            setActiveSidebarModal(SidebarModals.DirectMessages)
          }}
        />

        <UserBar className="border-t border-t-slate-300" />
      </div>
    </>
  )
}

export default NavigationSection
