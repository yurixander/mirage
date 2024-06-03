import Typography from "@/components/Typography"
import React, {memo, type FC} from "react"

export type DetailsProps = {
  title: string
  id: number
  children?: React.ReactNode
  rightAction: React.JSX.Element
}

export const Details: FC<DetailsProps> = ({title, children, rightAction}) => {
  return (
    <details className="cursor-pointer">
      <summary className="flex gap-1.5 text-sm font-bold text-slate-500">
        <Typography className="line-clamp-1">{title.toUpperCase()}</Typography>

        <div className="ml-auto">{rightAction}</div>
      </summary>

      <div className="pt-2">{children}</div>
    </details>
  )
}

export default memo(Details)
