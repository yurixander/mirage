import {useEffect, useRef, useState} from "react"

const useIntersection = <T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T>,
  boolean,
] => {
  const elementRef = useRef<T>(null)
  const [isIntersection, setIsIntersection] = useState(false)

  useEffect(() => {
    const ref = elementRef.current

    if (ref === null) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersection(true)
        } else {
          setIsIntersection(false)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    )

    observer.observe(ref)

    return () => {
      observer.unobserve(ref)
    }
  }, [])

  return [elementRef, isIntersection]
}

export default useIntersection
