import {useState, useEffect} from "react"

export type Credentials = {
  baseUrl: string
  accessToken: string
  userId: string
}

const CREDENTIALS_LOCAL_STORAGE_KEY = "credentials"

// TODO: Abstract based off `useLocalStorage` for this.
const useCachedCredentials = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null)

  useEffect(() => {
    const storedCredentials = localStorage.getItem(
      CREDENTIALS_LOCAL_STORAGE_KEY
    )

    if (storedCredentials === null) {
      return
    }

    const cachedCredentials: Credentials = JSON.parse(storedCredentials)

    setCredentials(cachedCredentials)
  }, [])

  const saveCredentials = (credentials: Credentials) => {
    localStorage.setItem(
      CREDENTIALS_LOCAL_STORAGE_KEY,
      JSON.stringify(credentials)
    )

    setCredentials(credentials)
  }

  return {credentials, saveCredentials}
}

export default useCachedCredentials
