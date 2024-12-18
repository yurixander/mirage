import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import {AlertDialogContent} from "./alert-dialog"
import {cn} from "@/utils/utils"
import {Button, type ButtonProps, buttonVariants} from "./button"
import {IoClose} from "react-icons/io5"
import {StaticAssetPath} from "@/utils/util"
import {ReactSVG} from "react-svg"
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
} from "react"
import React from "react"

const Modal = AlertDialogPrimitive.Root

const ModalTrigger = AlertDialogPrimitive.Trigger

const ModalContent = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({className, ...props}, ref) => (
  <AlertDialogContent
    className={cn(
      "w-full max-w-sm gap-8 sm:max-w-md md:max-w-lg lg:max-w-xl",
      className
    )}
    ref={ref}
    {...props}
  />
))

const ModalHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element => (
  <div className="flex w-full sm:items-center">
    <div className={cn("flex grow flex-col text-left", className)} {...props} />

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

const ModalTitle = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({className, ...props}, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "font-sans text-lg font-extrabold text-foreground",
      className
    )}
    {...props}
  />
))

const ModalDescription = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({className, ...props}, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("font-sans text-sm text-muted-foreground", className)}
    {...props}
  />
))

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  containDots?: boolean
}

const ModalFooter = ({
  className,
  containDots = true,
  ...props
}: ModalFooterProps): React.JSX.Element => (
  <div className="flex max-w-lg flex-col gap-8">
    {containDots && (
      <div className="hidden sm:flex sm:gap-1 sm:overflow-hidden">
        <ReactSVG src={StaticAssetPath.DotGrid} />

        <ReactSVG src={StaticAssetPath.DotGrid} />
      </div>
    )}

    <div className={cn("flex gap-2 sm:justify-end", className)} {...props} />
  </div>
)

const ModalAction = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Action>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({className, ...props}, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))

const ModalCancel = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Cancel>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({className, ...props}, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({variant: "outline"}), className)}
    {...props}
  />
))

const ModalMoreInfo = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant = "link", ...props}, ref) => (
    <Button
      variant={variant}
      ref={ref}
      className={cn("mr-auto w-max px-0 py-0 font-sans font-bold", className)}
      {...props}
    />
  )
)

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalAction,
  ModalCancel,
  ModalMoreInfo,
}
