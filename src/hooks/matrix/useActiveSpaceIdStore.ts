import {DASHBOARD_SPACE_ID} from "@/containers/NavigationSection/SpacesNavigation"
import {create} from "zustand"

type ActiveSpaceIdStore = {
  activeSpaceId: string
  clearActiveSpaceId: () => void
  setActiveSpaceId: (spaceId: string) => void
}

const useActiveSpaceIdStore = create<ActiveSpaceIdStore>(set => ({
  activeSpaceId: DASHBOARD_SPACE_ID,
  clearActiveSpaceId() {
    set(_state => ({activeSpaceId: DASHBOARD_SPACE_ID}))
  },
  setActiveSpaceId(spaceId) {
    set(_state => ({activeSpaceId: spaceId}))
  },
}))

export default useActiveSpaceIdStore
