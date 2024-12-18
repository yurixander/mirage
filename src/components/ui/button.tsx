import {type ButtonHTMLAttributes, forwardRef} from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/utils/utils"
import useTooltip from "@/hooks/util/useTooltip"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {twMerge} from "tailwind-merge"

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  asBoundary?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      asBoundary = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const {renderRef, showTooltip} = useTooltip<HTMLButtonElement>()
    const Comp = asChild ? Slot : "button"
    const isBoundaryActive = asBoundary && !asChild

    const onClickBoundary = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
      try {
        if (onClick === undefined) {
          showTooltip("Click not handled", true)

          return
        }

        onClick(event)
      } catch (error) {
        if (!(error instanceof Error)) {
          return
        }

        showTooltip(error.message, true)
      }
    }

    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}))}
        ref={isBoundaryActive ? renderRef : ref}
        {...props}
        onClick={isBoundaryActive ? onClickBoundary : onClick}
      />
    )
  }
)

Button.displayName = "Button"

interface IconButtonProps extends ButtonProps {
  tooltip?: string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      tooltip,
      size = "icon",
      className,
      variant = "ghost",
      asBoundary = true,
      ...props
    },
    ref
  ) => {
    const button = (
      <Button
        className={twMerge(
          "text-neutral-400/60 hover:bg-neutral-300 dark:hover:bg-neutral-800",
          className
        )}
        size={size}
        variant={variant}
        {...props}
        ref={ref}
        asBoundary={tooltip === undefined && asBoundary}
      />
    )

    return tooltip === undefined ? (
      button
    ) : (
      <TooltipProvider delayDuration={1000}>
        <Tooltip>
          <TooltipTrigger tabIndex={-1} asChild>
            {button}
          </TooltipTrigger>

          <TooltipContent aria-hidden>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

IconButton.displayName = "IconButton"

export {Button, IconButton, buttonVariants}
