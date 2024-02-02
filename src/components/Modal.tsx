import {useMemo, type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum ModalPosition {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

export type ModalProps = {
  position?: ModalPosition
  dialogs: JSX.Element[]
}

const popupPosition = (position?: ModalPosition): string => {
  switch (position) {
    case ModalPosition.Left:
      return "items-center justify-start"
    case ModalPosition.Right:
      return "items-center justify-end"
    case ModalPosition.Top:
      return "items-start justify-center"
    case ModalPosition.Bottom:
      return "items-end justify-center"
    case undefined:
      return "items-center justify-center"
    default:
      return "items-center justify-center"
  }
}

const Modal: FC<ModalProps> = ({position, dialogs}) => {
  const MAX_DIALOGS = 5

  const dialogsToShow = useMemo(
    () => [...dialogs].slice(0, MAX_DIALOGS).reverse(),
    [dialogs]
  )

  const calculateOpacity = (index: number) => {
    return 1 - 0.2 * (dialogsToShow.length - 1 - index)
  }

  return (
    <div
      className={twMerge(
        "fixed inset-0 flex content-center items-center bg-modalOverlay *:absolute",
        popupPosition(position)
      )}>
      {dialogsToShow.map((dialog, index) => (
        <div
          key={dialog.key ?? index}
          className="animate-enter"
          style={{opacity: calculateOpacity(index)}}>
          {dialog}
        </div>
      ))}
    </div>
  )
}

export default Modal
