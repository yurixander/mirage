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

const SPACE_CONTEXT_MENU_ID = 991

export const Space: FC<DetailsProps> = ({title, children}) => {
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
            id={SPACE_CONTEXT_MENU_ID}
            elements={[CONTEXT_MENU_EXPLORE_ROOM]}>
            <IconButton
              onClick={() => {}}
              size={14}
              iconClassName="text-slate-500"
              tooltip="More actions"
              Icon={IoEllipsisHorizontal}
            />
          </ContextMenu>
        </div>
      </summary>

      <div className="pt-2">{children}</div>
    </details>
  )
}

export default Space
