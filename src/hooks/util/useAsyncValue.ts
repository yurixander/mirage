import {useCallback, useEffect, useState} from "react"

export type AsyncState<T> =
  | {status: "idle"}
  | {status: "loading"}
  | {status: "error"; error: Error}
  | {status: "success"; data: T}

interface UseAsyncValueOptions<T> {
  initialValue?: T
  startLoading?: boolean
}

const useAsyncValue = <T>(
  action: () => Promise<T>,
  options: UseAsyncValueOptions<T> = {}
): [AsyncState<T>, (asyncFunction: () => Promise<T>) => void] => {
  const {initialValue, startLoading = false} = options

  const [state, setState] = useState<AsyncState<T>>(() => {
    if (startLoading) {
      return {status: "loading"}
    }

    if (initialValue !== undefined) {
      return {status: "success", data: initialValue}
    }

    return {status: "idle"}
  })

  const execute = useCallback(() => {
    setState({status: "loading"})

    action()
      .then(data => {
        setState({status: "success", data})
      })
      .catch(error => {
        setState({status: "error", error})
      })
  }, [action])

  useEffect(() => {
    if (startLoading) {
      execute()
    }
  }, [execute, startLoading])

  return [state, execute]
}

export default useAsyncValue
