import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export type TypographyProps = {
  className?: string
  variant: "h1" | "h2" | "h3" | "p" | "span"
  fontWeight: "default" | "strong" | "stronger"
  children?: React.ReactNode
}

const buildVariant = (variant: "h1" | "h2" | "h3" | "p" | "span"): string => {
  switch (variant) {
    case "h1":
      return "text-3xl"
    case "h2":
      return "text-2xl"
    case "h3":
      return "text-1xl"
    case "p":
      return "text-small"
    case "span":
      return "text-medium"
  }
}

const Typography: FC<TypographyProps> = ({
  variant = "span",
  className,
  children,
}) => {
  const Component = variant

  return (
    <>
      <Component className={twMerge(buildVariant(variant), className)}>
        {children}
      </Component>
    </>
  )
}

export default Typography
