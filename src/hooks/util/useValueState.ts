import {useState} from "react"

export type ValueState<T> =
  | {status: "loading"}
  | {status: "error"; error: Error}
  | {status: "success"; data: T}

const useValueState = <T>(
  initialState?: ValueState<T>
): [ValueState<T>, React.Dispatch<React.SetStateAction<ValueState<T>>>] => {
  return useState<ValueState<T>>(initialState ?? {status: "loading"})
}

export default useValueState
