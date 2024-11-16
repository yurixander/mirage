import {useCallback, useState, type FC} from "react"
import {StaticAssetPath} from "@/utils/util"
import SidebarActions from "./SidebarActions"
import UserBar from "./UserBar"
import {twMerge} from "tailwind-merge"
import useSpaces from "./hooks/useSpaces"
import useUserData from "./hooks/useUserData"
import {RoomNavigator, RoomSections} from "./RoomNavigator"
import useRoomNavigator from "./hooks/useRoomNavigator"
import useActiveRoomIdStore from "@/hooks/matrix/useActiveRoomIdStore"
import SpacesNavigation, {SpacesPlaceHolder} from "./SpacesNavigation"
import ValueStateHandler from "@/components/ValueStateHandler"
import useBreakpoint from "@/hooks/util/useMediaQuery"
import {ScrollArea} from "@/components/ui/scroll-area"
import CreateRoomModal from "@/components/CreateRoomModal"
import CreateSpaceModal from "@/components/CreateSpaceModal"
import useGlobalHotkey from "@/hooks/util/useGlobalHotkey"
import {Text} from "@/components/ui/typography"
import useActiveSpaceIdStore from "@/hooks/matrix/useActiveSpaceIdStore"
import useInvitedRoom from "@/hooks/matrix/useInvitedRoom"
import RoomInvitedSplash from "../RoomContainer/RoomInvitedSplash"
import SearchBar from "@/components/SearchBar"

export const DASHBOARD_SPACE_ID = "dashboard_space_id"

const NavigationSection: FC<{className?: string; onLogOut: () => void}> = ({
  className,
  onLogOut,
}) => {
  const {activeSpaceId, setActiveSpaceId} = useActiveSpaceIdStore()
  const {spaces: spacesState, onCreateSpace, uploadSpaceAvatar} = useSpaces()
  const {userDataState, userData, onRefreshData} = useUserData()
  const {isSmall} = useBreakpoint()
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false)
  const [modalCreateSpaceOpen, setModalCreateSpaceIsOpen] = useState(false)
  const [searchResult, setSearchResult] = useState<RoomSections | null>(null)

  const {activeRoomId, setActiveRoomId, clearActiveRoomId} =
    useActiveRoomIdStore()

  const [recommendedRoomSelected, setRecommendedRoomSelected] = useState<
    string | null
  >(null)

  const {roomInvitedDetail, onJoinRoom} = useInvitedRoom(
    recommendedRoomSelected,
    true
  )

  const {isSectionsLoading, sections, onCreateRoom} =
    useRoomNavigator(activeSpaceId)

  useGlobalHotkey({key: "S", ctrl: true, shift: true}, () =>
    setModalCreateSpaceIsOpen(true)
  )

  useGlobalHotkey({key: "R", ctrl: true, shift: true}, () =>
    setModalCreateSpaceIsOpen(true)
  )

  const searchRoom = useCallback(
    (query: string) => {
      setSearchResult({
        directs: sections.directs.filter(({roomName}) =>
          roomName.toLowerCase().includes(query)
        ),
        groups: sections.groups.filter(({roomName}) =>
          roomName.toLowerCase().includes(query)
        ),
        recommended: sections.recommended.filter(({roomName}) =>
          roomName.toLowerCase().includes(query)
        ),
      })
    },
    [sections]
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

      {recommendedRoomSelected !== null && (
        <RoomInvitedSplash
          roomDetailPreview={roomInvitedDetail}
          onClose={() => setRecommendedRoomSelected(null)}
          onJoinRoom={async () => {
            await onJoinRoom()

            setRecommendedRoomSelected(null)
          }}
        />
      )}

      <div className={twMerge("flex size-full max-w-[22rem]", className)}>
        <div className="flex w-16 grow flex-col gap-2 border-r border-r-neutral-300 bg-[#FAFBFD] dark:border-r-neutral-700 dark:bg-neutral-900">
          <div className="flex flex-col items-center p-1">
            <img
              src={StaticAssetPath.LogoSmall}
              alt="Mirage logo"
              className="size-10"
            />

            <Text className="font-serif" align="center">
              Mirage
            </Text>

            <div className="mt-2 h-0.5 w-12 rounded-full bg-neutral-300" />
          </div>

          <ValueStateHandler
            value={spacesState}
            loading={<SpacesPlaceHolder length={2} />}
            error={error => <div>Error {error.message}</div>}>
            {spaces => (
              <SpacesNavigation
                spaces={spaces}
                selectedSpace={activeSpaceId}
                onSelectedSpaceChange={spaceId => {
                  setActiveSpaceId(spaceId)

                  clearActiveRoomId()
                }}
                onCreateSpace={() => setModalCreateSpaceIsOpen(true)}
              />
            )}
          </ValueStateHandler>

          <SidebarActions className="mt-auto" onLogOut={onLogOut} />
        </div>

        <div className="flex size-full flex-col overflow-x-hidden border-r border-r-neutral-300 bg-[#FAFBFD] dark:border-r-neutral-700 dark:bg-neutral-900">
          <div className="flex h-12 items-center border-b border-neutral-300 px-3 dark:border-neutral-700">
            <SearchBar
              onDebounceChange={debouncedQuery => {
                if (debouncedQuery.length === 0) {
                  setSearchResult(null)

                  return
                }

                searchRoom(debouncedQuery.toLowerCase())
              }}
            />
          </div>

          <ScrollArea className="size-full" isScrollBarHidden avoidOverflow>
            <RoomNavigator
              roomSelected={activeRoomId ?? undefined}
              onRoomSelected={setActiveRoomId}
              sections={searchResult ?? sections}
              isDashboardActive={activeSpaceId === undefined}
              isLoading={isSectionsLoading}
              onCreateRoom={() => setIsCreateRoomModalOpen(true)}
              onRecommendedRoomClick={setRecommendedRoomSelected}
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
