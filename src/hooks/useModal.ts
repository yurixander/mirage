import {useState} from 'react'

export const useModal = () => {
  const [popups, setPopups] = useState<JSX.Element[]>([])

  const showPopup = (popup: JSX.Element) => {
    setPopups(prevPopups => [popup, ...prevPopups])
  }

  const hidePopup = (popup: JSX.Element) => {
    setPopups(prevPopups => prevPopups.filter(p => p !== popup))
  }

  return {
    popups,
    showPopup,
    hidePopup,
  }
}
