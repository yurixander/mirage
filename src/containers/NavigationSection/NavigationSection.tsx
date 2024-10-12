import ServerDropdown from "@/components/ServerDropdown"
import {MATRIX_SERVER} from "@/utils/servers"
import {useState, type FC} from "react"
import Spaces from "./Spaces"
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

const NavigationSection: FC<{className?: string}> = ({className}) => {
  const {setActiveModal} = useActiveModalStore()
  const [serverSelected, setServerSelected] = useState(MATRIX_SERVER)
  const [spaceSelected, setSpaceSelected] = useState<string>()
  const {spaces, isLoading} = useSpaces()
  const {userDataState, userData, onRefreshData} = useUserData()

  const {isSectionsLoading, sections} = useRoomNavigator(spaceSelected)

  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()

  return (
    <div className={twMerge("flex size-full max-w-72", className)}>
      <div className="flex size-full max-w-16 flex-col gap-2 border-r border-r-slate-300 bg-gray-100">
        <div className="flex flex-col items-center p-1">
          <ReactSVG src={StaticAssetPath.NewAppLogo} />

          <Typography
            className="font-unbounded font-bold"
            variant={TypographyVariant.BodySmall}
            style={{color: "#D64DF4"}}>
            MIRAGE
          </Typography>

          <div className="mt-2 h-0.5 w-12 rounded-full bg-slate-300" />
        </div>

        <Spaces
          isLoading={isLoading}
          spaces={spaces}
          spaceSelected={spaceSelected}
          onSpaceSelected={setSpaceSelected}
          onCreateSpace={() => {
            setActiveModal(Modals.CreateSpace)
          }}
        />

        <SidebarActions className="mt-auto" />
      </div>

      <div className="flex size-full flex-col border-r border-r-slate-300 bg-neutral-100 dark:bg-neutral-900">
        <div className="size-full max-h-12 shrink-0 border-b border-b-slate-300 p-2">
          <ServerDropdown
            initiallyServerSelected={serverSelected}
            onServerSelected={setServerSelected}
          />
        </div>

        <RoomNavigator
          roomSelected={activeRoomId ?? undefined}
          onRoomSelected={setActiveRoomId}
          sections={sections}
          isDashboardActive={spaceSelected === undefined}
          isLoading={isSectionsLoading}
          onCreateDM={() => {}}
          onCreateRoom={() => {}}
          addRoomToSpace={() => {}}
          onSearch={() => {}}
        />

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
