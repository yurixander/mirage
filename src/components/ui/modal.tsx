import React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import {AlertDialogContent} from "./alert-dialog"
import {cn} from "@/utils/utils"
import {buttonVariants} from "./button"
import {IoClose} from "react-icons/io5"

const ModalContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({className, ...props}, ref) => (
  <AlertDialogContent className={cn("max-w-xl")} ref={ref} {...props} />
))

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
  <div className="flex w-full sm:items-center">
    <div
      className={cn(
        "flex max-w-lg grow flex-col text-center sm:text-left",
        className
      )}
      {...props}
    />

    <AlertDialogPrimitive.AlertDialogCancel
      className={cn(
        buttonVariants({variant: "ghost", size: "icon"}),
        "hidden sm:flex",
        className
      )}>
      <IoClose className="size-6" />
    </AlertDialogPrimitive.AlertDialogCancel>
  </div>
)

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({className, ...props}, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("font-sans text-lg font-extrabold text-black", className)}
    {...props}
  />
))

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({className, ...props}, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("font-sans text-sm text-muted-foreground", className)}
    {...props}
  />
))

export {ModalContent, ModalHeader, ModalTitle, ModalDescription}
