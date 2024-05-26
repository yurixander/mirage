import {type FC} from "react"
import {type IconType} from "react-icons"
import Input, {type InputConstraint, type InputAction} from "./Input"
import Typography, {TypographyVariant} from "./Typography"

export type InputSectionProps = {
  title: string
  onValueChange: (value: string) => void
  placeholder: string
  icon?: IconType
  constraints?: InputConstraint[]
  actions?: InputAction[]
  isPassword?: boolean
  rows?: number
}

const InputSection: FC<InputSectionProps> = ({
  icon,
  onValueChange,
  title,
  actions,
  constraints,
  placeholder,
  isPassword,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography variant={TypographyVariant.Span}>{title}</Typography>

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
