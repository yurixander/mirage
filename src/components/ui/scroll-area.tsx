import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import {cn} from "@/utils/utils"
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
  type FC,
  useRef,
  useEffect,
} from "react"

interface ScrollAreaProps
  extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  isScrollBarHidden?: boolean
  avoidOverflow?: boolean
}

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {className, isScrollBarHidden, avoidOverflow = false, children, ...props},
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      className={cn(
        "relative overflow-hidden",
        avoidOverflow && "grow basis-0",
        className
      )}
      {...props}>
      <ScrollAreaPrimitive.Viewport
        className="size-full rounded-[inherit]"
        ref={ref}>
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

const SmartScrollArea: FC<SmartScrollAreaProps> = ({
  children,
  endScrollChange,
  ...props
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
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
