import IconButton from "@/components/IconButton"
import Typography from "@/components/Typography"
import React, {memo, type FC} from "react"
import {IoEllipsisHorizontal} from "react-icons/io5"

export type DetailsProps = {
  title: string
  id: number
  children?: React.ReactNode
  onMoreActionsClick: <T>(points: React.MouseEvent<T>) => void
}

export const Details: FC<DetailsProps> = ({
  title,
  children,
  onMoreActionsClick,
}) => {
  return (
    <details className="cursor-pointer">
      <summary className="flex gap-1.5 text-sm font-bold text-slate-500">
        <Typography className="line-clamp-1">{title.toUpperCase()}</Typography>

        <IconButton
          className="ml-auto"
          onClick={onMoreActionsClick}
          size={14}
          iconClassName="text-slate-500"
          tooltip="More actions"
          Icon={IoEllipsisHorizontal}
        />
      </summary>

      <div className="pt-2">{children}</div>
    </details>
  )
}

export default memo(Details)
