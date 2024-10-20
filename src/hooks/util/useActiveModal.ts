import {create} from "zustand"

export enum ModalPosition {
  Left,
  Right,
  Top,
  Bottom,
  Center,
}

export enum Modals {
  CreateRoom,
  CreateSpace,
}

export enum ModalRenderLocation {
  RoomList = "room-list",
  RoomContainer = "room-container",
  ChatMessages = "chat-messages",
}

type ActiveModalStore = {
  modalActive: Modals | null
  position: ModalPosition
  renderLocation: ModalRenderLocation | null
  setActiveModal: (
    modal: Modals,
    position?: ModalPosition,
    renderLocation?: ModalRenderLocation
  ) => void
  clearActiveModal: () => void
}

const useActiveModalStore = create<ActiveModalStore>(set => ({
  modalActive: null,
  renderLocation: null,
  position: ModalPosition.Center,
  setActiveModal: (modal, position, renderLocation) => {
    set(_state => ({
      modalActive: modal,
      position: position ?? ModalPosition.Center,
      renderLocation: renderLocation ?? null,
    }))
  },
  clearActiveModal: () => {
    set(_state => ({modalActive: null}))
  },
}))

export default useActiveModalStore
