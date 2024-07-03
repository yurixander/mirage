import ContextMenu, {
  ClickActions,
  type ContextMenuItem,
} from "@/components/ContextMenu"
import Typography from "@/components/Typography"
import React, {type FC} from "react"
import {IoEllipsisHorizontal} from "react-icons/io5"

export type DetailsDetailProps = {
  title: string
  spaceId: string
  children?: React.ReactNode
  menuElements?: ContextMenuItem[]
}

export const SpaceDetail: FC<DetailsDetailProps> = ({
  title,
  children,
  spaceId,
  menuElements,
}) => {
  return (
    <details className="cursor-pointer">
      <summary className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
        <Typography className="line-clamp-1">{title.toUpperCase()}</Typography>

        {menuElements !== undefined && menuElements.length > 0 && (
          <div className="ml-auto">
            <ContextMenu
              actionType={ClickActions.LeftClick}
              id={`space-menu-${spaceId}`}
              elements={menuElements}>
              <IoEllipsisHorizontal className="text-slate-500" size={14} />
            </ContextMenu>
          </div>
        )}
      </summary>

      <div className="pt-2">{children}</div>
    </details>
  )
}

export default SpaceDetail
