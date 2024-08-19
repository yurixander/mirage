import {type FC} from "react"
import {type IconType} from "react-icons"
import Input, {type InputConstraint, type InputAction} from "./Input"
import Typography, {TypographyVariant} from "./Typography"
import {twMerge} from "tailwind-merge"

export type InputSectionProps = {
  title: string
  onValueChange: (value: string) => void
  placeholder: string
  titleIcon?: IconType
  icon?: IconType
  constraints?: InputConstraint[]
  actions?: InputAction[]
  isPassword?: boolean
  rows?: number
  className?: string
}

const InputSection: FC<InputSectionProps> = ({
  icon,
  onValueChange,
  title,
  titleIcon,
  actions,
  constraints,
  placeholder,
  isPassword,
  className,
}) => {
  const TitleIcon = titleIcon

  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <Typography
        className="flex items-center gap-1"
        variant={TypographyVariant.BodyMedium}>
        {TitleIcon !== undefined && <TitleIcon />}
        {title}
      </Typography>

      <Input
        className="w-full"
        placeholder={placeholder}
        onValueChange={onValueChange}
        Icon={icon}
        actions={actions}
        constraints={constraints}
        type={isPassword === true ? "password" : "text"}
      />
    </div>
  )
}

export default InputSection
