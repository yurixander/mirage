import {type FC} from "react"
import {twMerge} from "tailwind-merge"

type AddServerIconProps = {
  className?: string
  onClick: () => void
}

const AddServerIcon: FC<AddServerIconProps> = ({className, onClick}) => {
  return (
    <svg
      className={twMerge("cursor-pointer", className)}
      onClick={onClick}
      width="47"
      height="47"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.5"
        y="1.5"
        width="47"
        height="47"
        rx="8.5"
        stroke="#E9EBED"
        strokeWidth="3"
        strokeDasharray="20 0"
      />

      <path
        d="M25.5 12V37M38 24.931L13 24.931"
        stroke="#E9EBED"
        strokeWidth="3"
      />
    </svg>
  )
}

export default AddServerIcon
