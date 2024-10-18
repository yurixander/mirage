import {useClientStore} from "@/hooks/matrix/useConnection"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {cn} from "@/utils/utils"
import {SyncState} from "matrix-js-sdk"
import React from "react"
import type {FC} from "react"
import type {IconType} from "react-icons"
import {IoMdMedical} from "react-icons/io"
import {IoAccessibility, IoContrast, IoGlobe} from "react-icons/io5"

const syncStateText: {[key in SyncState]: LangKey} = {
  [SyncState.Error]: LangKey.SyncError,
  [SyncState.Prepared]: LangKey.Ready,
  [SyncState.Stopped]: LangKey.Disconnected,
  [SyncState.Syncing]: LangKey.Syncing,
  [SyncState.Catchup]: LangKey.CatchingUp,
  [SyncState.Reconnecting]: LangKey.Reconnecting,
}

const SmartActionBar: FC<{className?: string}> = ({className}) => {
  const {syncState} = useClientStore()
  const {t} = useTranslation()

  return (
    <div
      className={cn(
        className,
        "flex w-full justify-end gap-4 border-t border-t-stone-300 bg-neutral-100 px-2 py-0.5 dark:border-t-stone-600 dark:bg-neutral-800"
      )}>
      <SmartAction
        aria-label={t(LangKey.QuickMenu)}
        icon={IoMdMedical}
        onClick={() => {
          /* TODO: Handle `Quick menu` click. */
        }}>
        {t(LangKey.QuickMenu)}
      </SmartAction>

      <SmartAction
        aria-label={t(LangKey.Accessibility)}
        icon={IoAccessibility}
        onClick={() => {
          /* TODO: Handle `Accessibility` click. */
        }}>
        {t(LangKey.Accessibility)}
      </SmartAction>

      <SmartAction
        aria-label={t(LangKey.SwitchTheme)}
        icon={IoContrast}
        onClick={() => {
          /* TODO: Handle `Switch theme` click. */
        }}>
        {t(LangKey.SwitchTheme)}
      </SmartAction>

      <SmartAction
        aria-label={t(LangKey.SyncState)}
        icon={IoGlobe}
        onClick={() => {}}>
        {syncState === null ? t(LangKey.Waiting) : t(syncStateText[syncState])}
      </SmartAction>
    </div>
  )
}

interface SmartActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType
}

const SmartAction = React.forwardRef<HTMLButtonElement, SmartActionProps>(
  ({className, icon, children, ...props}, ref) => {
    const Icon = icon

    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center gap-1 text-xs leading-[100%] text-neutral-500 dark:text-neutral-400 sm:text-sm",
          className
        )}
        {...props}>
        <Icon className="size-2.5 text-neutral-300 dark:text-neutral-500 sm:size-3.5" />

        {children}
      </button>
    )
  }
)

export default SmartActionBar
