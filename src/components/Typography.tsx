import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum TypographyVariant {
  H1 = "text-3xl",
  H2 = "text-2xl",
  H3 = "text-xl",
  P = "text-xs",
  Span = "text-sm",
}

export type TypographyProps = {
  className?: string
  variant?: TypographyVariant
  children?: React.ReactNode
}

// TODO: Add proper return type.
function getTagFromVariant(variant: TypographyVariant) {
  switch (variant) {
    case TypographyVariant.H1:
      return "h1"
    case TypographyVariant.H2:
      return "h2"
    case TypographyVariant.H3:
      return "h3"
    case TypographyVariant.P:
      return "p"
    case TypographyVariant.Span:
      return "span"
  }
}

const Typography: FC<TypographyProps> = ({
  variant = TypographyVariant.Span,
  className,
  children,
}) => {
  const Component = getTagFromVariant(variant)

  return (
    <Component className={twMerge(className, variant)}>{children}</Component>
  )
}

export default Typography
