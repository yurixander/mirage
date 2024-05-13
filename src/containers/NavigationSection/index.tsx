import {type FC} from "react"
import SidebarActions from "./SidebarActions"
import SpaceList from "./SpaceList"
import {SPACE_DATA} from "@/stories/spaceList.stories"
import UserBar from "./UserBar"
import Input from "@/components/Input"
import {IoSearch} from "react-icons/io5"

const NavigationSection: FC = () => {
  return (
    <>
      <div className="flex size-full max-w-52 flex-col gap-1 border border-slate-300 bg-slate-100">
        <Input
          Icon={IoSearch}
          placeholder="Search"
          isSmall
          className="border-b border-b-slate-300 p-3"
        />

        <SpaceList
          spaces={SPACE_DATA}
          className="overflow-y-auto scroll-smooth p-4"
        />

        <SidebarActions
          className="mt-auto p-4"
          onNotification={() => {}}
          onDirectMessages={() => {}}
          onCalls={() => {}}
          onExit={() => {}}
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
