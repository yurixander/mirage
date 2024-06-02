import React from "react"
import {type FC} from "react"
import {twMerge} from "tailwind-merge"

export enum TypographyVariant {
  HeadingLarge,
  HeadingMedium,
  Heading,
  Body,
  BodySmall,
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
    case TypographyVariant.HeadingLarge: {
      return "h1"
    }
    case TypographyVariant.HeadingMedium: {
      return "h2"
    }
    case TypographyVariant.Heading: {
      return "h3"
    }
    case TypographyVariant.Body:
    case TypographyVariant.BodySmall: {
      return "p"
    }
  }
}

const Typography: FC<TypographyProps> = ({
  variant = TypographyVariant.Body,
  as,
  className,
  children,
  style,
}) => {
  const Component = as ?? getTagFromVariant(variant)

  const variantClass =
    variant === TypographyVariant.HeadingLarge
      ? "font-unbounded text-4xl font-semibold"
      : variant === TypographyVariant.HeadingMedium
        ? "font-unbounded text-2xl font-medium"
        : variant === TypographyVariant.Heading
          ? "font-unbounded text-xl font-medium"
          : variant === TypographyVariant.Body
            ? "text-base"
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
