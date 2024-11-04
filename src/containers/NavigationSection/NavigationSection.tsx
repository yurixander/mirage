import {useState, type FC} from "react"
import {StaticAssetPath} from "@/utils/util"
import {ReactSVG} from "react-svg"
import Typography, {TypographyVariant} from "@/components/Typography"
import SidebarActions from "./SidebarActions"
import UserBar from "./UserBar"
import {twMerge} from "tailwind-merge"
import useSpaces from "./hooks/useSpaces"
import useUserData from "./hooks/useUserData"
import {RoomNavigator} from "./RoomNavigator"
import useRoomNavigator from "./hooks/useRoomNavigator"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import SpacesNavigation, {SpacesPlaceHolder} from "./SpacesNavigation"
import ValueStateHandler from "@/components/ValueStateHandler"
import useBreakpoint from "@/hooks/util/useMediaQuery"
import {ScrollArea} from "@/components/ui/scroll-area"
import {SearchInput} from "@/components/ui/input"
import CreateSpaceModal from "@/components/CreateSpaceModal"

export const DASHBOARD_SPACE_ID = "dashboard_space_id"

const NavigationSection: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const [spaceSelected, setSpaceSelected] = useState(DASHBOARD_SPACE_ID)
  const {spaces: spacesState, onCreateSpace, uploadSpaceAvatar} = useSpaces()
  const {userDataState, userData, onRefreshData} = useUserData()
  const {isSmall} = useBreakpoint()
  const {isSectionsLoading, sections} = useRoomNavigator(spaceSelected)
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()
  const [modalCreateSpaceOpen, setModalCreateSpaceIsOpen] = useState(false)

  if (!isSmall && activeRoomId !== null) {
    return <></>
  }

  return (
    <>
      <CreateSpaceModal
        open={modalCreateSpaceOpen}
        onOpenChange={setModalCreateSpaceIsOpen}
        onCreateSpace={onCreateSpace}
        onUploadAvatar={uploadSpaceAvatar}
      />

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
                onCreateSpace={() => setModalCreateSpaceIsOpen(true)}
              />
            )}
          </ValueStateHandler>

          <SidebarActions className="mt-auto" onLogOut={onLogOut} />
        </div>

        <div className="flex size-full flex-col border-r border-r-neutral-300 bg-neutral-100 dark:border-r-neutral-700 dark:bg-neutral-900">
          <div className="border-b border-neutral-300 p-2 dark:border-neutral-700">
            <SearchInput
              onQueryDebounceChange={() => {
                // TODO: Handle global search.
              }}
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
                // setActiveModal(Modals.CreateRoom)
              }}
              onCreateDM={() => {
                throw new Error("Create DM not implemented.")
              }}
              addRoomToSpace={() => {
                throw new Error("Add room to space not implemented.")
              }}
              onSearch={() => {
                throw new Error("Room search not implemented.")
              }}
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
    </>
  )
}

export default NavigationSection
