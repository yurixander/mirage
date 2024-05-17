import {type FC} from "react"
import SidebarActions from "./SidebarActions"
import SpaceList from "./SpaceList"
import UserBar from "./UserBar"
import Input from "@/components/Input"
import {IoSearch} from "react-icons/io5"
import useNavigation from "@/containers/NavigationSection/hooks/useNavigation"
import useSidebarActions, {SidebarModals} from "./hooks/useSidebarActions"
import SidebarModalsHandler from "./SidebarModalsHandler"
import useGlobalEventListeners from "@/hooks/matrix/useGlobalEventListeners"

const NavigationSection: FC = () => {
  const {spaces} = useNavigation()
  const {onLogout, setActiveSidebarModal} = useSidebarActions()
  const {containsUnreadNotifications} = useGlobalEventListeners()

  return (
    <>
      <SidebarModalsHandler />

      <div className="flex size-full max-w-52 flex-col gap-1 border border-slate-300 bg-slate-100">
        <div className="max-h-14 border-b border-b-slate-300">
          <Input Icon={IoSearch} placeholder="Search" isSmall className="p-3" />
        </div>

        <SpaceList
          spaces={spaces}
          className="overflow-y-auto scroll-smooth p-4"
        />

        <SidebarActions
          className="mt-auto p-4"
          notificationsCount={containsUnreadNotifications}
          onCalls={() => {}}
          onNotification={() => {
            setActiveSidebarModal(SidebarModals.Notifications)
          }}
          onDirectMessages={() => {
            setActiveSidebarModal(SidebarModals.DirectMessages)
          }}
          onExit={() => {
            void onLogout()
          }}
        />

        <UserBar
          className="border-t border-t-slate-300"
          displayName="Emerald Branch"
          displayNameColor="#5CC679"
          userId="@emerald_branch"
        />
      </div>
    </>
  )
}

export default NavigationSection
