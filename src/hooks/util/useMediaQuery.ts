import {useEffect, useState} from "react"

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (): void => {
      setMatches(media.matches)
    }

    media.addEventListener("change", listener)

    return () => {
      media.removeEventListener("change", listener)
    }
  }, [matches, query])

  return matches
}

type UseBreakPointReturnType = {
  isSmall: boolean
  isMedium: boolean
  isLarge: boolean
}

export const useBreakpoint = (): UseBreakPointReturnType => {
  const isSmall = useMediaQuery("(min-width: 480px)")
  const isMedium = useMediaQuery("(min-width: 768px)")
  const isLarge = useMediaQuery("(min-width: 1024px)")

  return {isSmall, isMedium, isLarge}
}

export default useBreakpoint
