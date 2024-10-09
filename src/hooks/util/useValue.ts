import {useCallback, useState} from "react"

export enum ValueState {
  Loading,
  Loaded,
  Error,
}

type ValueOf<
  Kind extends ValueState,
  ValueType,
> = Kind extends ValueState.Loading
  ? true
  : Kind extends ValueState.Error
    ? Error
    : ValueType

type Value<Kind extends ValueState, ValueType> = {
  kind: Kind
  data: ValueOf<Kind, ValueType>
}

export type AnyValue<ValueType> =
  | Value<ValueState.Loading, ValueType>
  | Value<ValueState.Error, ValueType>
  | Value<ValueState.Loaded, ValueType>
  | null

type UseValueReturnType<T> = {
  value: AnyValue<T> | null
  action: (callback: () => Promise<T>) => void
}

const LOADING_DEFAULT: AnyValue<ValueState.Loading> = {
  kind: ValueState.Loading,
  data: true,
} as const

type ValueStateOptions = {
  isInitiallyLoading: boolean
}

const useValue = <T>(
  initiallyValue?: T,
  options?: ValueStateOptions
): UseValueReturnType<T> => {
  const [value, setValue] = useState<AnyValue<T>>(
    options?.isInitiallyLoading === true
      ? LOADING_DEFAULT
      : initiallyValue === undefined
        ? null
        : {kind: ValueState.Loaded, data: initiallyValue}
  )

  const action = useCallback((callback: () => Promise<T>) => {
    setValue(LOADING_DEFAULT)

    void callback()
      .then(newValue => {
        setValue({kind: ValueState.Loaded, data: newValue})
      })
      .catch((error: Error) => {
        setValue({kind: ValueState.Error, data: error})
      })
  }, [])

  return {
    value,
    action,
  }
}

export default useValue
