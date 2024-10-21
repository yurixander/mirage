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
import RoomList from "./RoomList"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"
import useUserData from "./hooks/useUserData"
import SpacesNavigation, {
  DASHBOARD_SPACE_ID,
  SpacesPlaceHolder,
} from "./SpacesNavigation"
import ValueStateHandler from "@/components/ValueStateHandler"

const NavigationSection: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const {setActiveModal} = useActiveModalStore()
  const [serverSelected, setServerSelected] = useState(MATRIX_SERVER)
  const [spaceSelected, setSpaceSelected] = useState(DASHBOARD_SPACE_ID)
  const {spaces: spacesState} = useSpaces()
  const {userDataState, userData, onRefreshData} = useUserData()

  return (
    <div className={twMerge("flex size-full max-w-72", className)}>
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

        <ValueStateHandler
          value={spacesState}
          loading={<SpacesPlaceHolder length={2} />}
          // TODO: Put a correct error state.
          error={error => <div>Error {error.message}</div>}>
          {spaces => (
            <SpacesNavigation
              spaces={spaces}
              selectedSpace={spaceSelected}
              onSelectedSpaceChange={setSpaceSelected}
              onCreateSpace={() => {
                setActiveModal(Modals.CreateSpace)
              }}
            />
          )}
        </ValueStateHandler>

        <SidebarActions className="mt-auto" onLogOut={onLogOut} />
      </div>

      <div className="flex size-full flex-col border-r border-r-slate-300 bg-gray-100">
        <div className="size-full max-h-12 shrink-0 border-b border-b-slate-300 p-2">
          <ServerDropdown
            initiallyServerSelected={serverSelected}
            onServerSelected={setServerSelected}
          />
        </div>

        <RoomList
          onSpaceSelected={setSpaceSelected}
          spaceId={spaceSelected}
          className="size-full border-b border-b-slate-300"
        />

        <UserBar
          className="mt-auto h-16 w-full"
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
