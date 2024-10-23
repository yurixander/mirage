import ServerDropdown from "@/components/ServerDropdown"
import {MATRIX_SERVER} from "@/utils/servers"
import {useState, type FC} from "react"
import {StaticAssetPath} from "@/utils/util"
import {ReactSVG} from "react-svg"
import Typography, {TypographyVariant} from "@/components/Typography"
import SidebarActions from "./SidebarActions"
import UserBar from "./UserBar"
import {twMerge} from "tailwind-merge"
import useSpaces from "./hooks/useSpaces"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"
import useUserData from "./hooks/useUserData"
import {RoomNavigator} from "./RoomNavigator"
import useRoomNavigator from "./hooks/useRoomNavigator"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import SpacesNavigation, {
  DASHBOARD_SPACE_ID,
  SpacesPlaceHolder,
} from "./SpacesNavigation"
import {useIsSmall} from "@/hooks/util/useMediaQuery"
import {ScrollArea} from "@/components/ui/scroll-area"

const NavigationSection: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const {setActiveModal} = useActiveModalStore()
  const [serverSelected, setServerSelected] = useState(MATRIX_SERVER)
  const [spaceSelected, setSpaceSelected] = useState(DASHBOARD_SPACE_ID)
  const {spaces, isLoading} = useSpaces()
  const {userDataState, userData, onRefreshData} = useUserData()
  const isSm = useIsSmall()
  const {isSectionsLoading, sections} = useRoomNavigator(spaceSelected)
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()

  if (!isSm && activeRoomId !== null) {
    return <></>
  }

  return (
    <div className={twMerge("flex size-full sm:max-w-80", className)}>
      <div className="flex size-full max-w-16 flex-col gap-2 border-r border-r-neutral-300 bg-neutral-100 dark:border-r-neutral-700 dark:bg-neutral-900">
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

      <div className="flex size-full flex-col border-r border-r-neutral-300 bg-neutral-100 dark:border-r-neutral-700 dark:bg-neutral-900">
        <div className="size-full max-h-12 shrink-0 border-b border-neutral-300 p-2 dark:border-neutral-700">
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
          className="mt-auto h-16 w-full border-t border-t-neutral-300 dark:border-t-neutral-700"
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
