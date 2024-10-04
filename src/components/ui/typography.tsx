import React from "react"
import {cva} from "class-variance-authority"
import {cn} from "@/utils/utils"

type TypographyAs = "span" | "p" | "div" | "label"
type TypographyWeight = "light" | "regular" | "medium" | "semibold" | "bold"
type TypographyAlign = "left" | "center" | "right"

type TypographyColor =
  | "default"
  | "muted"
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "background"
  | "card"
  | "popover"

type TypographyVariants = {
  weight: Record<TypographyWeight, string>
  align: Record<TypographyAlign, string>
  color: Record<TypographyColor, string>
}

const typographyClass: TypographyVariants = {
  weight: {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
  align: {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  },
  color: {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    accent: "text-accent-foreground",
    destructive: "text-destructive-foreground",
    background: "text-background",
    card: "text-card-foreground",
    popover: "text-popover-foreground",
  },
}

const typographyVariants = cva("w-full", {
  variants: typographyClass,
  defaultVariants: {
    weight: "regular",
    align: "left",
    color: "default",
  },
})

type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

type TextVariants = {
  size: Record<TextSize, string>
}

const textSizeClass: TextVariants = {
  size: {
    "1": "text-xs",
    "2": "text-sm",
    "3": "text-base",
    "4": "text-lg",
    "5": "text-xl",
    "6": "text-2xl",
    "7": "text-3xl",
    "8": "text-4xl",
    "9": "text-5xl",
  },
}

const textVariants = cva("leading-[110%]", {
  variants: textSizeClass,
  defaultVariants: {
    size: "3",
  },
})

interface TextProps<T extends TypographyAs>
  extends Omit<React.AllHTMLAttributes<HTMLElement>, "size"> {
  as?: T
  size?: TextSize
  color?: TypographyColor
  weight?: TypographyWeight
  align?: TypographyAlign
}

function Text<T extends TypographyAs = "span">({
  as,
  size,
  color,
  weight,
  align,
  className,
  ...props
}: TextProps<T>): React.JSX.Element {
  const Component = as ?? "span"

  return (
    <Component
      className={cn(
        textVariants({size}),
        typographyVariants({color, weight, align}),
        className
      )}
      {...props}
    />
  )
}

// #region Heading
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HeadingVariants = {
  level: Record<HeadingLevel, string>
}

const headingClass: HeadingVariants = {
  level: {
    h1: "text-5xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
    h6: "text-base",
  },
}

const headingVariants = cva("font-bold leading-[160%]", {
  variants: headingClass,
  defaultVariants: {
    level: "h3",
  },
})

interface HeadingProps extends React.AllHTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  color?: TypographyColor
  weight?: TypographyWeight
  align?: TypographyAlign
}

function Heading({
  color,
  weight,
  align,
  level = "h3",
  className,
  ...props
}: HeadingProps): React.JSX.Element {
  const Component = level

  return (
    <Component
      className={cn(
        typographyVariants({color, weight, align}),
        headingVariants({level}),
        className
      )}
      {...props}
    />
  )
}

export {Text, Heading}
