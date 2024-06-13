import {useCallback, useState} from "react"

export enum LocalStorageKey {
  Credentials = "credentials",
}

const getLocalStorageValue = <T>(key: LocalStorageKey): T | null => {
  const storedValue = localStorage.getItem(key)

  if (storedValue === null) {
    return null
  }

  // TODO: Use `zod` library to verify stored item's types.
  return JSON.parse(storedValue) as T
}

const useLocalStorage = <T>(key: LocalStorageKey) => {
  const [value, setCachedValue] = useState<T | null>(
    useCallback(() => getLocalStorageValue<T>(key), [key])
  )

  const refresh = useCallback(() => {
    setCachedValue(getLocalStorageValue<T>(key))
  }, [key])

  const put = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value))
      setCachedValue(value)
    },
    [key]
  )

  const remove = useCallback(() => {
    localStorage.removeItem(key)
  }, [key])

  return {
    value,
    refresh,
    put,
    remove,
  }
}

export default useLocalStorage
