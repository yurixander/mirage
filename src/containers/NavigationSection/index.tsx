import {type FC} from "react"
import SidebarActions from "./SidebarActions"
import SpaceList from "./SpaceList"
import {SPACE_DATA} from "@/stories/spaceList.stories"
import UserBar from "./UserBar"

const NavigationSection: FC = () => {
  return (
    <>
      <div className="flex h-full max-w-56 flex-col gap-1 bg-slate-100">
        <SidebarActions
          className="p-4"
          onNotification={() => {}}
          onDirectMessages={() => {}}
          onCalls={() => {}}
          onExit={() => {}}
        />

        <div className="h-4 shrink" />

        <SpaceList
          spaces={SPACE_DATA}
          className="overflow-y-auto scroll-smooth p-4 scrollbar-hide"
        />

        <UserBar
          className="mt-auto border-t border-t-slate-300"
          displayName="Emerald Branch"
          displayNameColor="#5CC679"
          userId="@emerald_branch"
        />
      </div>
    </>
  )
}

export default NavigationSection
