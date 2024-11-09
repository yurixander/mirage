import {useState, type FC} from "react"
import {StaticAssetPath} from "@/utils/util"
import {ReactSVG} from "react-svg"
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
import CreateRoomModal from "@/components/CreateRoomModal"
import CreateSpaceModal from "@/components/CreateSpaceModal"
import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"
import {Heading, Text} from "@/components/ui/typography"
import useSpaceDetail from "@/hooks/matrix/useSpaceDetail"

export const DASHBOARD_SPACE_ID = "dashboard_space_id"

const NavigationSection: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const [spaceSelected, setSpaceSelected] = useState(DASHBOARD_SPACE_ID)
  const {spaces: spacesState, onCreateSpace, uploadSpaceAvatar} = useSpaces()
  const {userDataState, userData, onRefreshData} = useUserData()
  const {isSmall} = useBreakpoint()
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false)
  const {activeRoomId, setActiveRoomId} = useActiveRoomIdStore()
  const [modalCreateSpaceOpen, setModalCreateSpaceIsOpen] = useState(false)
  const {name} = useSpaceDetail(spaceSelected)

  const {isSectionsLoading, sections, onCreateRoom} =
    useRoomNavigator(spaceSelected)

  useGlobalHotkey({key: "S", ctrl: true, shift: true}, () =>
    setModalCreateSpaceIsOpen(true)
  )

  useGlobalHotkey({key: "R", ctrl: true, shift: true}, () =>
    setModalCreateSpaceIsOpen(true)
  )

  if (!isSmall && activeRoomId !== null) {
    return <></>
  }

  return (
    <>
      <CreateRoomModal
        open={isCreateRoomModalOpen}
        onOpenChange={setIsCreateRoomModalOpen}
        onCreateRoom={onCreateRoom}
      />

      <CreateSpaceModal
        open={modalCreateSpaceOpen}
        onOpenChange={setModalCreateSpaceIsOpen}
        onCreateSpace={onCreateSpace}
        onUploadAvatar={uploadSpaceAvatar}
      />

      <div className={twMerge("flex size-full sm:max-w-max", className)}>
        <div className="flex size-full max-w-16 flex-col gap-2 border-r border-r-neutral-300 bg-neutral-100 dark:border-r-neutral-700 dark:bg-neutral-900">
          <div className="flex flex-col items-center p-1">
            <ReactSVG src={StaticAssetPath.NewAppLogo} />

            <Text
              className="font-unbounded uppercase"
              weight="semibold"
              style={{
                color: "#D64DF4",
                fontSize: "0.70rem",
                lineHeight: "0.75rem",
              }}>
              Mirage
            </Text>

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
          <div className="border-b border-neutral-300 px-2.5 py-1.5 dark:border-neutral-700">
            <Heading level="h5">
              {spaceSelected === DASHBOARD_SPACE_ID ? "Dashboard" : name}
            </Heading>
          </div>

          <ScrollArea
            className="size-full sm:h-full sm:w-64"
            isScrollBarHidden
            avoidOverflow>
            <RoomNavigator
              roomSelected={activeRoomId ?? undefined}
              onRoomSelected={setActiveRoomId}
              sections={sections}
              isDashboardActive={spaceSelected === undefined}
              isLoading={isSectionsLoading}
              onCreateRoom={() => setIsCreateRoomModalOpen(true)}
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
