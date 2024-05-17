import React from "react"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum TypographyVariant {
  H1,
  H2,
  H3,
  P,
  Span,
}

export type TypographyProps = {
  className?: string
  style?: React.CSSProperties
  variant?: TypographyVariant
  as?: keyof React.JSX.IntrinsicElements
  children?: React.ReactNode
}

function getTagFromVariant(
  variant: TypographyVariant
): keyof React.JSX.IntrinsicElements {
  switch (variant) {
    case TypographyVariant.H1: {
      return "h1"
    }
    case TypographyVariant.H2: {
      return "h2"
    }
    case TypographyVariant.H3: {
      return "h3"
    }
    case TypographyVariant.P: {
      return "p"
    }
    case TypographyVariant.Span: {
      return "span"
    }
  }
}

const Typography: FC<TypographyProps> = ({
  variant = TypographyVariant.Span,
  as,
  className,
  children,
  style,
}) => {
  const Component = as ?? getTagFromVariant(variant)

  const variantClass =
    variant === TypographyVariant.H1
      ? "text-3xl"
      : variant === TypographyVariant.H2
        ? "text-2xl"
        : variant === TypographyVariant.H3
          ? "text-xl"
          : variant === TypographyVariant.P
            ? "text-xs"
            : "text-sm"

  return (
    <Component
      style={style}
      className={twMerge("leading-160", className, variantClass)}>
      {children}
    </Component>
  )
}

export default Typography
