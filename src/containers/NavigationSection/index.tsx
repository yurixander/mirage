import {useState, type FC} from "react"
import SidebarActions from "./SidebarActions"
import SpaceList from "./SpaceList"
import UserBar from "./UserBar"
import useSidebarActions from "./hooks/useSidebarActions"
import useGlobalEventListeners from "@/hooks/matrix/useGlobalEventListeners"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"
import ServerDropdown from "@/components/ServerDropdown"
import {MATRIX_SERVER} from "@/utils/servers"

const NavigationSection: FC = () => {
  const {onLogout} = useSidebarActions()
  const {containsUnreadNotifications} = useGlobalEventListeners()
  const {setActiveModal} = useActiveModalStore()
  const [serverSelected, setServerSelected] = useState(MATRIX_SERVER)

  return (
    <>
      <div className="flex size-full max-w-52 flex-col gap-1 border border-slate-300 bg-slate-100">
        <div className="max-h-12 border-b border-b-slate-300 p-2">
          <ServerDropdown
            initiallyServerSelected={serverSelected}
            onServerSelected={setServerSelected}
          />
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
            setActiveModal(Modals.Notifications)
          }}
          onDirectMessages={() => {
            setActiveModal(Modals.DirectMessages)
          }}
        />

        <UserBar className="border-t border-t-slate-300" />
      </div>
    </>
  )
}

export default NavigationSection
