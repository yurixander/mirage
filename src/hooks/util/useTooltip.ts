import {delay} from "@/utils/util"
import type React from "react"
import {useEffect, useRef, useState} from "react"
import tippy, {type Instance, type Props} from "tippy.js"

type UseTooltipReturnType<T> = {
  renderRef: React.RefObject<T>
  showTooltip: (msg: string, isError?: boolean) => void
  closeTooltip: () => void
}

const TOOLTIP_ERROR_PROPS: Partial<Props> = {
  arrow: true,
  placement: "top",
  duration: 100,
  animation: "scale-subtle",
  trigger: "none",
}

const useTooltip = <T>(
  optionalProps?: Partial<Props>
): UseTooltipReturnType<T> => {
  const renderRef = useRef<T>(null)

  const [tippyInstance, setTippyInstance] = useState<Instance<Props> | null>(
    null
  )

  useEffect(() => {
    return () => {
      if (tippyInstance === null) {
        return
      }

      tippyInstance.hide()
    }
  }, [tippyInstance])

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

  const showTooltip = (msg: string, isError?: boolean): void => {
    if (tippyInstance === null) {
      return
    }

    tippyInstance.setProps({theme: isError ? "error" : "default"})
    tippyInstance.setContent(msg)
    tippyInstance.show()

    void delay(3000).then(() => {
      tippyInstance.hide()
    })
  }

  const closeTooltip = (): void => {
    if (tippyInstance === null) {
      return
    }

    tippyInstance.hide()
  }

  return {renderRef, showTooltip, closeTooltip}
}

export default useTooltip
