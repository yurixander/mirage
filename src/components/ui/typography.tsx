import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {trim} from "@/utils/util"
import {cn} from "@/utils/utils"
import {cva} from "class-variance-authority"
import type React from "react"
import type {FC} from "react"

type TruncatedProps = {
  text: string
  maxLength: number
  delayDuration?: number
}

export type TruncatedPropsWith<T> = Omit<T, keyof TruncatedProps | "children"> &
  TruncatedProps

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

interface TypographyBaseProps<T>
  extends Omit<React.AllHTMLAttributes<T>, "color" | "weight" | "align"> {
  color?: TypographyColor
  weight?: TypographyWeight
  align?: TypographyAlign
}

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

// #region Text
type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
type TextAs = "span" | "p" | "div" | "label"

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

export interface TextProps
  extends Omit<TypographyBaseProps<HTMLElement>, "size"> {
  as?: TextAs
  size?: TextSize
}

const Text: FC<TextProps> = ({
  as,
  size,
  color,
  weight,
  align,
  className,
  ...props
}) => {
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

export interface HeadingProps extends TypographyBaseProps<HTMLHeadingElement> {
  level?: HeadingLevel
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

// #region Truncated
interface TruncatedPrimitiveProps extends TruncatedProps {
  children: (text: string) => React.ReactNode
}

const TruncatedPrimitive: FC<TruncatedPrimitiveProps> = ({
  text,
  maxLength,
  delayDuration,
  children,
}) => {
  const exceedsLimit = text.length > maxLength

  if (!exceedsLimit) {
    return children(text)
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger className="cursor-default" aria-label={text}>
          {children(trim(text, maxLength))}
        </TooltipTrigger>

        <TooltipContent aria-hidden>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const TruncatedText: FC<TruncatedPropsWith<TextProps>> = ({
  maxLength,
  text,
  delayDuration,
  className,
  ...props
}) => {
  return (
    <TruncatedPrimitive
      text={text}
      maxLength={maxLength}
      delayDuration={delayDuration}>
      {truncatedText => (
        <Text {...props} className={cn("w-max", className)}>
          {truncatedText}
        </Text>
      )}
    </TruncatedPrimitive>
  )
}

const TruncatedHeading: FC<TruncatedPropsWith<HeadingProps>> = ({
  maxLength,
  text,
  delayDuration,
  className,
  ...props
}) => {
  return (
    <TruncatedPrimitive
      text={text}
      maxLength={maxLength}
      delayDuration={delayDuration}>
      {truncatedText => (
        <Heading {...props} className={cn("w-max", className)}>
          {truncatedText}
        </Heading>
      )}
    </TruncatedPrimitive>
  )
}

export {Text, Heading, TruncatedText, TruncatedHeading}
