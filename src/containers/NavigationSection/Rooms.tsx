import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import {IoMdArrowDropdown} from "react-icons/io"

import {cn} from "@/utils/utils"
import {type FC} from "react"

const Accordion = AccordionPrimitive.Root

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({className, children, ...props}, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center gap-0.5 p-1 text-xs font-bold uppercase text-slate-500 transition-transform [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}>
      <IoMdArrowDropdown className="size-5 shrink-0 text-muted-foreground transition-transform duration-200" />

      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({className, children, ...props}, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("py-2", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

const Some: FC = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionPrimitive.Item value="some">
        <AccordionTrigger>Algooooo</AccordionTrigger>

        <AccordionContent>hggfhgf</AccordionContent>
      </AccordionPrimitive.Item>
    </Accordion>
  )
}

export default Some
