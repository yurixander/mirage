import {useClientStore} from "@/hooks/matrix/useConnection"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {cn} from "@/utils/utils"
import {SyncState} from "matrix-js-sdk"
import React, {useState} from "react"
import {type FC} from "react"
import {type IconType} from "react-icons"
import {IoContrast, IoGlobe} from "react-icons/io5"

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

  const [isDarkTheme, setIsDarkTheme] = useState(false)

  document.querySelectorAll("html")[0].className = isDarkTheme ? "dark" : ""

  const handleSwitchTheme = (): void => {
    setIsDarkTheme(prevIsDarkTheme => !prevIsDarkTheme)
  }

  return (
    <div
      className={cn(
        className,
        "flex w-full justify-center gap-4 border-t border-t-stone-300 bg-neutral-100 px-2 py-0.5 dark:border-t-stone-600 dark:bg-neutral-800 sm:justify-end"
      )}>
      <SmartAction
        aria-label={t(LangKey.SwitchTheme)}
        icon={IoContrast}
        onClick={handleSwitchTheme}>
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
