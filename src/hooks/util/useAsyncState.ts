import {useState} from "react"

export type AsyncState<T> =
  | {status: "loading"}
  | {status: "error"; error: Error}
  | {status: "success"; data: T}

const useAsyncState = <T>(
  initialState?: AsyncState<T>
): [AsyncState<T>, React.Dispatch<React.SetStateAction<AsyncState<T>>>] => {
  return useState<AsyncState<T>>(initialState ?? {status: "loading"})
}

export default useAsyncState
