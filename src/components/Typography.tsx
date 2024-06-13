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
  variant?: TypographyVariant
  as?: keyof React.JSX.IntrinsicElements
  children?: React.ReactNode
  onClick?: () => void
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
    case TypographyVariant.BodySmall:
    case TypographyVariant.BodyMedium: {
      return "p"
    }
  }
}

const Typography: FC<TypographyProps> = ({
  onClick,
  variant = TypographyVariant.Body,
  as,
  className,
  children,
  style,
}) => {
  const Component = as ?? getTagFromVariant(variant)

  const variantClass =
    variant === TypographyVariant.HeadingLarge
      ? "font-unbounded xl:text-4xl text-2xl font-semibold"
      : variant === TypographyVariant.HeadingMedium
        ? "font-unbounded xl:text-2xl text-xl font-medium"
        : variant === TypographyVariant.Heading
          ? "font-unbounded xl:text-xl text-lg font-medium"
          : variant === TypographyVariant.Body
            ? "text-base"
            : variant === TypographyVariant.BodyMedium
              ? "text-sm"
              : "text-xs"

  return (
    <Component
      onClick={onClick}
      style={style}
      className={twMerge("leading-160", className, variantClass)}>
      {children}
    </Component>
  )
}

export default Typography
