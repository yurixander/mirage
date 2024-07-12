import {useEffect, useRef} from "react"

const useIsMountedReference = (): React.MutableRefObject<boolean> => {
  const isMounted = useRef(false)

  useEffect((): (() => void) => {
    isMounted.current = true

    return (): void => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

export default useIsMountedReference
