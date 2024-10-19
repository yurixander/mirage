import ServerDropdown from "@/components/ServerDropdown"
import Typography, {TypographyVariant} from "@/components/Typography"
import {ScrollArea} from "@/components/ui/scroll-area"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"
import {MATRIX_SERVER} from "@/utils/servers"
import {StaticAssetPath} from "@/utils/util"
import {type FC, useState} from "react"
import {ReactSVG} from "react-svg"
import {twMerge} from "tailwind-merge"
import {RoomNavigator} from "./RoomNavigator"
import SidebarActions from "./SidebarActions"
import SpacesNavigation, {
  DASHBOARD_SPACE_ID,
  SpacesPlaceHolder,
} from "./SpacesNavigation"
import UserBar from "./UserBar"
import useRoomNavigator from "./hooks/useRoomNavigator"
import useSpaces from "./hooks/useSpaces"
import useUserData from "./hooks/useUserData"

const NavigationSection: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const {setActiveModal} = useActiveModalStore()
  const [serverSelected, setServerSelected] = useState(MATRIX_SERVER)
  const [spaceSelected, setSpaceSelected] = useState(DASHBOARD_SPACE_ID)
  const {spaces, isLoading} = useSpaces()
  const {userDataState, userData, onRefreshData} = useUserData()

  const {isSectionsLoading, sections} = useRoomNavigator(spaceSelected)

  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()

  return (
    <div className={twMerge("flex size-full sm:max-w-80", className)}>
      <div className="flex size-full max-w-16 flex-col gap-2 border-r border-r-slate-300 bg-neutral-100 dark:bg-neutral-900">
        <div className="flex flex-col items-center p-1">
          <ReactSVG src={StaticAssetPath.NewAppLogo} />

          <Typography
            className="font-unbounded font-bold"
            variant={TypographyVariant.BodySmall}
            style={{color: "#D64DF4"}}>
            MIRAGE
          </Typography>

          <div className="mt-2 h-0.5 w-12 rounded-full bg-neutral-300" />
        </div>

        {isLoading ? (
          <SpacesPlaceHolder length={2} />
        ) : (
          <SpacesNavigation
            spaces={spaces}
            selectedSpace={spaceSelected}
            onSelectedSpaceChange={setSpaceSelected}
            onCreateSpace={() => {
              setActiveModal(Modals.CreateSpace)
            }}
          />
        )}

        <SidebarActions className="mt-auto" onLogOut={onLogOut} />
      </div>

      <div className="flex size-full flex-col border-r border-r-slate-300 bg-neutral-100 dark:bg-neutral-900">
        <div className="size-full max-h-12 shrink-0 border-b border-b-slate-300 p-2">
          <ServerDropdown
            initiallyServerSelected={serverSelected}
            onServerSelected={setServerSelected}
          />
        </div>

        <ScrollArea
          className="size-full sm:h-full sm:w-60"
          isScrollBarHidden
          avoidOverflow>
          <RoomNavigator
            roomSelected={activeRoomId ?? undefined}
            onRoomSelected={setActiveRoomId}
            sections={sections}
            isDashboardActive={spaceSelected === undefined}
            isLoading={isSectionsLoading}
            onCreateRoom={() => {
              setActiveModal(Modals.CreateRoom)
            }}
            onCreateDM={() => {}}
            addRoomToSpace={() => {}}
            onSearch={() => {}}
          />
        </ScrollArea>

        <UserBar
          className="mt-auto h-16 w-full border-t border-t-slate-300"
          userDataState={userDataState}
          userId={userData.userId}
          displayName={userData.displayName}
          avatarImageUrl={userData.avatarImageUrl}
          onRefreshData={onRefreshData}
          onOpenSettings={function (): void {
            throw new Error("Open settings not implemented.")
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSection
