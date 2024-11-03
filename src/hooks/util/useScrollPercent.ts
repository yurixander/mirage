import {type DependencyList, useEffect, useState} from "react"

function calculateScrollPercent(scroll: HTMLDivElement): number {
  const scrollTop = scroll.scrollTop
  const scrollHeight = scroll.scrollHeight - scroll.clientHeight

  return (scrollTop / scrollHeight) * 100
}

const useScrollPercent = (
  containerScrollRef: React.RefObject<HTMLDivElement>,
  depsUpdater: DependencyList = []
): number => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const scroll = containerScrollRef.current

    if (scroll === null) {
      return
    }

    const updatePercent = (): void => {
      setPercent(Math.round(calculateScrollPercent(scroll)))
    }

    const resizeObserver = new ResizeObserver(updatePercent)
    resizeObserver.observe(scroll)

    scroll.addEventListener("scroll", updatePercent)

    return () => {
      scroll.removeEventListener("scroll", updatePercent)

      resizeObserver.disconnect()
    }
  }, [containerScrollRef, depsUpdater])

  return percent
}

export default useScrollPercent
