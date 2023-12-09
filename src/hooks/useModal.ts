import {create} from "zustand"

interface ModelState {
  elements: JSX.Element[]
  showModal: (element: JSX.Element) => void
  closeModal: (element: JSX.Element) => void
}

export const useModal = create<ModelState>(set => ({
  elements: [],
  showModal: element => set(state => ({elements: [element, ...state.elements]})),
  closeModal: element => set(state => ({
    elements: state.elements.filter(target => target !== element)
  })),
}))
