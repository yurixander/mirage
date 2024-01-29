import Loader from "@/components/Loader"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"
import {Theme, Button} from "@radix-ui/themes"

export enum ButtonVariant {
  Primary = "primary",
  Green = "green",
  TextLink = "text-link",
  Default = "default",
}

export type ButtonProps = {
  autoFocus?: boolean
  onClick: () => void
  label: string
  isLoading?: boolean
  loadingText?: string
  variant?: ButtonVariant
  isDisabled?: boolean
}

const extractVariant = (variant?: ButtonVariant): string => {
  switch (variant) {
    case ButtonVariant.Primary:
      return "bg-buttonPrimaryBg text-white border-primaryDarken"
    case ButtonVariant.Green:
      return "bg-buttonGreenBg text-white border-greenDarken"
    case ButtonVariant.TextLink:
      return ""
    case ButtonVariant.Default:
      return "p-5px bg-green text-xs border-1 border-solid border-greenDark rounded-3 text-white font-strong"
    case undefined:
      return "p-5px bg-green text-xs border-1 border-solid border-greenDark rounded-3 text-white font-strong"
  }
}

const ButtonComponent: FC<ButtonProps> = ({
  autoFocus,
  onClick,
  label: text,
  isLoading,
  loadingText,
  isDisabled,
  variant,
}) => {
  return (
    <>
      <Theme>
        <Button
          className={twMerge(
            "flex active:translate-y-1px origin-center cursor-pointer items-center justify-center rounded-10 border-1 border-b-4 border-solid border-red p-10px font-strong outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outlineTab disabled:translate-y-1px",
            extractVariant(variant)
          )}
          radius="large"
          disabled={isLoading ?? isDisabled}
          autoFocus={autoFocus}
          onClick={isDisabled ? undefined : onClick}
          tabIndex={isDisabled ? undefined : 0}>
          {isLoading ? <Loader text={loadingText ?? text} /> : text}
        </Button>
      </Theme>
    </>
  )
}

export default ButtonComponent
