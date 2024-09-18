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
import RoomList from "./RoomList"
import useActiveModalStore, {Modals} from "@/hooks/util/useActiveModal"
import useUserData from "./hooks/useUserData"

const NavigationSection: FC<{className?: string}> = ({className}) => {
  const {setActiveModal} = useActiveModalStore()
  const [serverSelected, setServerSelected] = useState(MATRIX_SERVER)
  const [spaceSelected, setSpaceSelected] = useState<string>()
  const {spaces, isLoading} = useSpaces()
  const {userDataState, userData, onRefreshData} = useUserData()

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
          className="h-24 w-full shrink-0"
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
