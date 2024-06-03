import ContextMenu, {
  ClickActions,
  type ContextMenuItem,
} from "@/components/ContextMenu"
import IconButton from "@/components/IconButton"
import Typography from "@/components/Typography"
import React, {type FC} from "react"
import {IoAddCircle, IoEllipsisHorizontal} from "react-icons/io5"

export type DetailsProps = {
  title: string
  id: number
  children?: React.ReactNode
}

export const SpaceDetail: FC<DetailsProps> = ({title, children, id}) => {
  const CONTEXT_MENU_EXPLORE_ROOM: ContextMenuItem = {
    icon: IoAddCircle,
    text: "Explore rooms",
    onClick: () => {
      throw new Error("Explore rooms not handled")
    },
  }

  return (
    <details className="cursor-pointer">
      <summary className="flex gap-1.5 text-sm font-bold text-slate-500">
        <Typography className="line-clamp-1">{title.toUpperCase()}</Typography>

        <div className="ml-auto">
          <ContextMenu
            actionType={ClickActions.LeftClick}
            id={id}
            elements={[CONTEXT_MENU_EXPLORE_ROOM]}>
            <IoEllipsisHorizontal className="text-slate-500" size={14} />
          </ContextMenu>
        </div>
      </summary>

      <div className="pt-2">{children}</div>
    </details>
  )
}

export default SpaceDetail
