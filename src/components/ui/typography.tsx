import React from "react"
import {cva} from "class-variance-authority"

type TypographySize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

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
  size: Record<TypographySize, string>
  weight: Record<TypographyWeight, string>
  align: Record<TypographyAlign, string>
  color: Record<TypographyColor, string>
}

const variantsClass = {
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
} satisfies TypographyVariants

const textVariants = cva("w-full leading-[110%]", {
  variants: variantsClass,
  defaultVariants: {
    size: "3",
    weight: "regular",
    align: "left",
    color: "default",
  },
})

interface TypographyProps<T extends TypographyAs>
  extends Omit<React.AllHTMLAttributes<T>, "size"> {
  children: React.ReactNode
  as?: T
  size?: TypographySize
  color?: TypographyColor
  weight?: TypographyWeight
  align?: TypographyAlign
}

function Text<T extends TypographyAs = "span">({
  children,
  as,
  size,
  color,
  weight,
  align,
}: TypographyProps<T>): React.JSX.Element {
  const Component = as ?? "span"

  return (
    <Component className={textVariants({size, color, weight, align})}>
      {children}
    </Component>
  )
}

export {Text}
