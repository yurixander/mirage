import {type FC} from "react"
import SidebarActions from "./SidebarActions"
import SpaceList from "./SpaceList"
import UserBar from "./UserBar"
import Input from "@/components/Input"
import {IoSearch} from "react-icons/io5"
import useSidebarActions, {SidebarModals} from "./hooks/useSidebarActions"
import SidebarModalsHandler from "./SidebarModalsHandler"
import useGlobalEventListeners from "@/hooks/matrix/useGlobalEventListeners"

const NavigationSection: FC = () => {
  const {onLogout, setActiveSidebarModal} = useSidebarActions()
  const {containsUnreadNotifications} = useGlobalEventListeners()

  return (
    <>
      <SidebarModalsHandler />

      <div className="flex size-full max-w-52 flex-col gap-1 border border-slate-300 bg-slate-100">
        <div className="max-h-12 border-b border-b-slate-300">
          <Input Icon={IoSearch} placeholder="Search" isSmall className="p-2" />
        </div>

        <SpaceList className="p-4" />

        <SidebarActions
          className="mt-auto p-4"
          notificationsCount={containsUnreadNotifications}
          onCalls={() => {}}
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
