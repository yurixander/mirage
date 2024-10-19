import {MATRIX_SERVER} from "@/utils/servers"
import {type Credentials, ViewPath} from "@/utils/util"
import {SyncState, createClient} from "matrix-js-sdk"
import {useCallback, useEffect, useState} from "react"
import type React from "react"
import {useNavigate} from "react-router-dom"
import useConnection from "../matrix/useConnection"
import useLocalStorage, {LocalStorageKey} from "./useLocalStorage"

type UseLoginReturnType = {
  isConnecting: boolean
  syncState: SyncState | null
  lastSyncError: Error | null
  login: () => Promise<void>
  setUserId: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

const useLogin = (): UseLoginReturnType => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  const {value: credentials, put: saveCredentials} =
    useLocalStorage<Credentials>(LocalStorageKey.Credentials)

  const {connect, disconnect, syncState, lastSyncError, isConnecting, client} =
    useConnection()

  // FIXME: Temporary default server, replace with Servers Dropdown component.
  const baseUrl = MATRIX_SERVER.url

  const login = useCallback(async () => {
    if (isConnecting) {
      return
    }

    const stagedClient = createClient({baseUrl})

    const {access_token: accessToken, device_id: deviceId} =
      await stagedClient.loginWithPassword(userId, password)

    const connectedAndSynced = await connect({
      accessToken,
      deviceId,
      baseUrl,
      userId,
    })

    if (!connectedAndSynced) {
      return
    }

    saveCredentials({accessToken, baseUrl, userId, deviceId})
    await disconnect()
    navigate(ViewPath.App)
  }, [
    password,
    connect,
    disconnect,
    isConnecting,
    navigate,
    saveCredentials,
    baseUrl,
    userId,
  ])

  // Automatically login if credentials are cached.
  useEffect(() => {
    if (
      credentials === null ||
      isConnecting ||
      syncState === SyncState.Error ||
      syncState === SyncState.Stopped ||
      client !== null
    ) {
      return
    }

    void connect(credentials).then(async connectedAndSynced => {
      if (!connectedAndSynced) {
        return
      }

      await disconnect()
      navigate(ViewPath.App)
    })
  }, [
    client,
    connect,
    credentials,
    disconnect,
    isConnecting,
    navigate,
    syncState,
  ])

  return {
    setUserId,
    setPassword,
    lastSyncError,
    login,
    syncState,
    isConnecting,
  }
}

export default useLogin
