import React from "react"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum TypographyVariant {
  HeadingLarge,
  HeadingMedium,
  Heading,
  Body,
  BodyMedium,
  BodySmall,
}

export type TypographyProps = {
  className?: string
  style?: React.CSSProperties
  ariaHidden?: boolean
  variant?: TypographyVariant
  as?: keyof React.JSX.IntrinsicElements
  children?: React.ReactNode
  onClick?: () => void
}

const tagFromVariant: {
  [key in TypographyVariant]: keyof React.JSX.IntrinsicElements
} = {
  [TypographyVariant.HeadingLarge]: "h1",
  [TypographyVariant.HeadingMedium]: "h2",
  [TypographyVariant.Heading]: "h3",
  [TypographyVariant.Body]: "p",
  [TypographyVariant.BodyMedium]: "p",
  [TypographyVariant.BodySmall]: "p",
}

const variantClass: {[key in TypographyVariant]: string} = {
  [TypographyVariant.HeadingLarge]:
    "font-unbounded xl:text-4xl text-2xl font-semibold",
  [TypographyVariant.HeadingMedium]:
    "font-unbounded xl:text-2xl text-xl font-medium",
  [TypographyVariant.Heading]: "font-unbounded xl:text-xl text-lg font-medium",
  [TypographyVariant.Body]: "text-base",
  [TypographyVariant.BodyMedium]: "text-sm",
  [TypographyVariant.BodySmall]: "text-xs",
}

const Typography: FC<TypographyProps> = ({
  onClick,
  variant = TypographyVariant.Body,
  as,
  className,
  children,
  style,
  ariaHidden,
}) => {
  const Component = as ?? tagFromVariant[variant]

  return (
    <Component
      aria-hidden={ariaHidden}
      onClick={onClick}
      style={style}
      className={twMerge("leading-160", className, variantClass[variant])}>
      {children}
    </Component>
  )
}

export default Typography
