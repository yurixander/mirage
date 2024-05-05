import {useState} from "react"

export enum LocalStorageKeys {
  Credentials = "credentials",
}

const reFetchLocalStorageValue = <T>(key: LocalStorageKeys): T | null => {
  const storedValue = localStorage.getItem(key)

  if (storedValue === null) {
    return null
  }

  const value: T = JSON.parse(storedValue)

  return value
}

const useLocalStorage = <T>(key: LocalStorageKeys) => {
  const [cachedValue, setCachedValue] = useState<T | null>(
    reFetchLocalStorageValue<T>(key)
  )

  const refreshValue = () => {
    setCachedValue(reFetchLocalStorageValue<T>(key))
  }

  const saveValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
    setCachedValue(value)
  }

  const removeValue = () => {
    localStorage.removeItem(key)
  }

  return {
    cachedValue,
    refreshValue,
    saveValue,
    removeValue,
  }
}

export default useLocalStorage
