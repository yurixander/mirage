import {type DependencyList, useEffect, useState} from "react"

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

    const handleScroll = (): void => {
      const scrollTop = scroll.scrollTop
      const scrollHeight = scroll.scrollHeight - scroll.clientHeight
      const percentage = (scrollTop / scrollHeight) * 100

      setPercent(Math.round(percentage))
    }

    scroll.addEventListener("scroll", handleScroll)

    return () => {
      scroll.removeEventListener("scroll", handleScroll)
    }
  }, [containerScrollRef, depsUpdater])

  return percent
}

export default useScrollPercent
