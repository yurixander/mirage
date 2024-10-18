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

export const useIsSmall = (): boolean => useMediaQuery("(min-width: 480px)")
export const useIsMedium = (): boolean => useMediaQuery("(min-width: 768px)")
