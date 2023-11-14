import "../styles/Login.sass"
import {useEffect, useState} from "react"
import * as sdk from "matrix-js-sdk"
import {SyncState} from "matrix-js-sdk/lib/sync"
import {useNavigate} from "react-router-dom"
import {Credentials, Path} from "../util"
import Button, {ButtonStyle} from "../components/Button"
import {smartTimeout} from "../hooks/useTimeout"
import Footer from "../components/Footer"
import Input, {nonEmptyConstraint, urlConstraint, userIdConstraint} from "../components/Input"
import useQueue from "../hooks/useQueue"
import StatusMessage from "../components/StatusMessage"

const CREDENTIALS_LOCAL_STORAGE_KEY = "credentials"

export default function LoginPage() {
  const [baseUrl, setBaseUrl] = useState("https://matrix-client.matrix.org/")
  const [userId, setUserId] = useState<string>("")
  const {current: status, pushItem: pushStatus} = useQueue<string>()
  const [isConnecting, setIsConnecting] = useState(true)
  const [accessToken, setAccessToken] = useState<string>("")
  const navigate = useNavigate()

  const updateStatus = (newStatus: string) =>
    pushStatus(newStatus)

  const cacheCredentials = () => {
    localStorage.setItem(
      CREDENTIALS_LOCAL_STORAGE_KEY,
      JSON.stringify({
        baseUrl,
        accessToken,
        userId,
      })
    )
  }

  const login = (credentials: Credentials) => {
    if (isConnecting)
      return

    setIsConnecting(true)

    const client = sdk.createClient(credentials)

    smartTimeout(() => {
      if (!isConnecting)
        return

      client.stopClient()
      updateStatus("Timed out. Try again later.")
      setIsConnecting(false)
    }, 10_000)

    client.once(sdk.ClientEvent.Sync, function(state, _syncState, res) {
      if (state === SyncState.Error) {
        client.stopClient()
        updateStatus(`Sync error: ${res?.error?.message}`)
        setIsConnecting(false)

        return
      }

      cacheCredentials()
      client.stopClient()

      navigate(Path.App, {
        state: {
          baseUrl,
          accessToken,
          userId,
        },
      })
    })

    // OPTIMIZE: Inefficient, we only need to test whether the credentials are valid. Might need to use React context to solve this.
    client.startClient()
  }

  // Automatically login if credentials are cached. The user should
  // manually logout to clear the cache.
  useEffect(() => {
    const cachedCredentialsJson = localStorage.getItem(CREDENTIALS_LOCAL_STORAGE_KEY)

    if (cachedCredentialsJson === null) {
      setIsConnecting(false)

      return
    }

    const cachedCredentials: Credentials = JSON.parse(cachedCredentialsJson)

    login(cachedCredentials)
  }, [])

  return (
    // TODO: Utility classes were removed. Adjust class names accordingly.
    <div className="Login --flex -vertical">
      <img className="--float -left -top" src="/pink-glow.svg" />
      <img alt="Mirage's logo" width="200" src="/logo-black.svg" className="--margin-x2" />
      <div className="login-box --z --margin-x1">
        <div className="--text-center --margin-x1">
          <h4>Just one more thing.</h4>
          <p>Sign in now to get started</p>
        </div>
        <Input
          isDisabled={isConnecting}
          label="Base URL"
          placeholder="https://matrix-client.matrix.org/"
          constraints={[urlConstraint]}
          value={baseUrl}
          onValueChange={setBaseUrl}
        />
        <Input
          isDisabled={isConnecting}
          label="Access Token"
          placeholder="Access token"
          autoFocus
          constraints={[nonEmptyConstraint]}
          onValueChange={setAccessToken}
        />
        <Input
          isDisabled={isConnecting}
          label="User ID"
          placeholder="@doe:matrix.org"
          constraints={[userIdConstraint]}
          onValueChange={setUserId}
        />
        <Button
          style={ButtonStyle.Primary}
          onClick={() => login({baseUrl, accessToken, userId})}
          text="Continue ⟶"
          isLoading={isConnecting}
        />
        {status !== null && <StatusMessage text={status} />}
      </div>
      <Footer />
    </div>
  )
}
