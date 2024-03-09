import {create} from "zustand"

type ModelState = {
  elements: React.JSX.Element[]
  showModal: (element: React.JSX.Element) => void
  closeModal: (element: React.JSX.Element) => void
}

export const useModal = create<ModelState>(set => ({
  elements: [],
  showModal: element => {
    set(state => ({elements: [element, ...state.elements]}))
  },
  closeModal: element => {
    set(state => ({
      elements: state.elements.filter(target => target !== element),
    }))
  },
}))
