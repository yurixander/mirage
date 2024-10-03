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

const variants: TypographyVariants = {
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
} as const

const textVariants = cva("w-full leading-[110%]", {
  variants,
  defaultVariants: {
    size: "3",
    weight: "regular",
    align: "left",
    color: "default",
  },
})

const Text = (): React.JSX.Element => {
  return (
    <>
      <Typography variantSize="3">Algo</Typography>
      <Typography variantSize="4">Algo</Typography>
      <Typography variantSize="5">Algo</Typography>
      <Typography variantSize="6">Algo</Typography>
      <Typography variantSize="7">Algo</Typography>
      <Typography variantSize="8">Algo</Typography>
      <Typography variantSize="9">Algo</Typography>
    </>
  )
}

interface TypographyProps<T extends TypographyAs>
  extends React.AllHTMLAttributes<T> {
  children: React.ReactNode
  as?: T
  variantSize: TypographySize
  color?: TypographyColor
  weight?: TypographyWeight
  align?: TypographyAlign
}

function Typography<T extends TypographyAs>({
  children,
  as,
  variantSize,
  color,
  weight,
  align,
}: TypographyProps<T>): React.JSX.Element {
  const Component = as ?? "span"

  return (
    <Component
      className={textVariants({size: variantSize, color, weight, align})}>
      {children}
    </Component>
  )
}

export {Text}
