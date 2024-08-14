import {useEffect, useRef, useState} from "react"
import tippy, {type Instance, type Props} from "tippy.js"

type UseErrorTooltipReturnType<T> = {
  renderRef: React.RefObject<T>
  showErrorTooltip: (msg: string) => void
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
        optionalProps ?? {content: "Error", ...TOOLTIP_ERROR_PROPS}
      )
    })
  }, [optionalProps])

  const showErrorTooltip = (msg: string): void => {
    if (tippyInstance === null) {
      return
    }

    tippyInstance.setContent(msg)
    tippyInstance.show()
  }

  return {renderRef, showErrorTooltip}
}

export default useErrorTooltip
