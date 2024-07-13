import React, {type FC} from "react"
import ContextMenu, {ClickActions, type ContextMenuItem} from "./ContextMenu"
import Typography from "./Typography"
import {IoEllipsisHorizontal} from "react-icons/io5"
import {twMerge} from "tailwind-merge"

export type DetailProps = {
  title: string
  id: string
  children?: React.ReactNode
  menuElements?: ContextMenuItem[]
  className?: string
}

const Detail: FC<DetailProps> = ({
  title,
  id,
  menuElements,
  children,
  className,
}) => {
  return (
    <details className={twMerge("cursor-pointer", className)}>
      <summary className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
        <Typography className="line-clamp-1">{title.toUpperCase()}</Typography>

        {menuElements !== undefined && menuElements.length > 0 && (
          <div className="ml-auto">
            <ContextMenu
              actionType={ClickActions.LeftClick}
              id={id}
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

export default Detail
