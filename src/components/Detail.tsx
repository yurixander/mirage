import type React from "react"
import type {FC} from "react"
import ContextMenu, {ClickActions, type ContextMenuItem} from "./ContextMenu"
import Typography, {TypographyVariant} from "./Typography"
import {IoEllipsisHorizontal} from "react-icons/io5"
import {twMerge} from "tailwind-merge"
import {assert} from "@/utils/util"
import {motion} from "framer-motion"

export type DetailProps = {
  title: string
  id: string
  isInitiallyOpen?: boolean
  children?: React.ReactNode
  menuElements?: ContextMenuItem[]
  className?: string
}

const Detail: FC<DetailProps> = ({
  title,
  id,
  menuElements,
  children,
  isInitiallyOpen = false,
  className,
}) => {
  assert(id.length > 0, "Detail id should not be empty.")

  if (menuElements !== undefined) {
    assert(
      menuElements.length > 0,
      "If menu elements is defined should not be empty."
    )
  }

  return (
    <details
      open={isInitiallyOpen}
      className={twMerge("cursor-pointer", className)}>
      <summary className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
        <Typography
          variant={TypographyVariant.BodySmall}
          className="line-clamp-1">
          {title.toUpperCase()}
        </Typography>

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

      <motion.div className="pt-2">{children}</motion.div>
    </details>
  )
}

export default Detail
