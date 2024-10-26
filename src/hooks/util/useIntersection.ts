import {useEffect, useRef, useState} from "react"

type UseIntersectionReturnType<C extends HTMLElement, E extends HTMLElement> = {
  containerRef: React.RefObject<C>
  elementRef: React.RefObject<E>
  isIntersecting: boolean
}

const useIntersection = <
  C extends HTMLElement = HTMLDivElement,
  E extends HTMLElement = HTMLDivElement,
>(): UseIntersectionReturnType<C, E> => {
  const containerRef = useRef<C>(null)
  const elementRef = useRef<E>(null)
  const [isIntersecting, setIsIntersection] = useState(false)

  useEffect(() => {
    const targetElement = elementRef.current
    const containerElement = containerRef.current

    if (!targetElement || !containerElement) {
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
        root: elementRef.current,
        rootMargin: "0px",
        threshold: 1,
      }
    )

    observer.observe(targetElement)

    return () => {
      observer.unobserve(targetElement)
    }
  }, [])

  return {containerRef, elementRef, isIntersecting}
}

export default useIntersection
