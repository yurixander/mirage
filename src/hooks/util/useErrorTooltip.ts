import {useEffect, useRef, useState} from "react"
import tippy, {type Instance, type Props} from "tippy.js"

type UseErrorTooltipReturnType<T> = {
  renderRef: React.RefObject<T>
  showErrorTooltip: () => void
}

const TOOLTIP_ERROR_PROPS: Partial<Props> = {
  arrow: true,
  placement: "top",
  duration: 100,
  animation: "scale-subtle",
  trigger: "none",
  theme: "error",
}

const useErrorTooltip = <T>(
  errorMsg: string,
  hasError: boolean,
  optionalProps?: Partial<Props>
): UseErrorTooltipReturnType<T> => {
  const renderRef = useRef<T>(null)

  const [tippyInstance, setTippyInstance] = useState<Instance<Props> | null>(
    null
  )

  useEffect(() => {
    const render = renderRef.current

    if (render === null || !(render instanceof HTMLElement)) {
      return
    }

    setTippyInstance(prevInstance => {
      // Use singleton instance.
      if (prevInstance !== null) {
        return prevInstance
      }

      return tippy(
        render,
        optionalProps ?? {content: errorMsg, ...TOOLTIP_ERROR_PROPS}
      )
    })
  }, [errorMsg, optionalProps])

  useEffect(() => {
    if (tippyInstance === null) {
      return
    }

    if (hasError) {
      tippyInstance.show()
    } else if (tippyInstance.state.isShown) {
      tippyInstance.hide()
    }
  }, [hasError, tippyInstance])

  const showErrorTooltip = (): void => {
    if (tippyInstance === null) {
      return
    }

    tippyInstance.show()
  }

  return {renderRef, showErrorTooltip}
}

export default useErrorTooltip
