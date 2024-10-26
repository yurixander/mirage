import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import {cn} from "@/utils/utils"

interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  isScrollBarHidden?: boolean
  avoidOverflow?: boolean
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {className, isScrollBarHidden, avoidOverflow = false, children, ...props},
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        avoidOverflow && "grow basis-0",
        className
      )}
      {...props}>
      <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBar className={cn(isScrollBarHidden && "hidden")} />

      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
)

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

interface SmartScrollAreaProps extends ScrollAreaProps {
  endScrollChange?: (isEndScroll: boolean) => void
}

const SmartScrollArea: React.FC<SmartScrollAreaProps> = ({
  children,
  endScrollChange,
  ...props
}) => {
  const elementRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const targetElement = elementRef.current
    const containerElement = containerRef.current

    if (
      targetElement === null ||
      containerElement === null ||
      endScrollChange === undefined
    ) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        endScrollChange(entry.isIntersecting)
      },
      {
        root: containerElement,
        rootMargin: "0px",
        threshold: 0.1,
      }
    )

    observer.observe(targetElement)

    return () => {
      observer.unobserve(targetElement)
    }
  }, [endScrollChange])

  return (
    <ScrollArea ref={containerRef} {...props}>
      {children}

      <div ref={elementRef} />
    </ScrollArea>
  )
}

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({className, orientation = "vertical", ...props}, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-1.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-1.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}>
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export {ScrollArea, ScrollBar, SmartScrollArea}
