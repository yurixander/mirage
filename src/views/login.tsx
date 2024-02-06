import Input, {urlConstraint, userIdConstraint} from "@/components/Input"
import Typography from "@/components/Typography"
import {useEffect, useState, type FC} from "react"
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons"
import Button, {ButtonSize, ButtonVariant} from "@/components/Button"
import useCredentials from "@/hooks/matrix/useCredentials"
import useClient from "@/hooks/matrix/useClient"
import {checkCredentials} from "@/utils/util"
import {ClientEvent, SyncState} from "matrix-js-sdk"
import {useNavigate} from "react-router-dom"

const LoginView: FC = () => {
  const navigate = useNavigate()
  const {credentials, saveCredentials} = useCredentials()
  const {connect, disconnect, client} = useClient()
  const [serverUrl, setServerUrl] = useState("https://matrix-client.matrix.org")
  const [accessToken, setAccessToken] = useState(
    "syt_dGhlY3Jpc3M_yBPDvDMuDeMKQFonYlQM_09tZYX"
  )

  const [userId, setUserId] = useState("@thecriss:matrix.org")
  const [isPassShowed, setIsPassShowed] = useState(false)

  const login = () => {
    client?.once(ClientEvent.Sync, (state, _syncState, res) => {
      if (state === SyncState.Error) {
        void disconnect()
        console.error(`Sync error: ${res?.error?.message}`)

        return
      }

      saveCredentials({accessToken, baseUrl: serverUrl, userId})
      void disconnect()

      navigate("/rooms")
    })
  }

  // Automatically login if credentials are cached.
  useEffect(() => {
    if (credentials === undefined) {
      return
    }

    void connect(credentials)
    login()
  }, [])

  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex w-80 flex-col items-center justify-center gap-4">
        <div className="flex w-72 flex-col gap-4 p-4">
          <Typography variant={"h3"}>Sign In Now!</Typography>
          <Input
            initialValue={serverUrl}
            constraints={[urlConstraint]}
            placeholder={"Server url"}
            onValueChange={setServerUrl}></Input>
          <Input
            placeholder={"Access token"}
            initialValue={accessToken}
            actions={[
              {
                tooltip: isPassShowed ? "Hide pass" : "Show pass",
                onClick: () => {
                  setIsPassShowed(!isPassShowed)
                },
                icon: isPassShowed ? faEyeSlash : faEye,
              },
            ]}
            onValueChange={setAccessToken}
          />
          <Input
            initialValue={userId}
            constraints={[userIdConstraint]}
            placeholder={"User ID"}
            onValueChange={setUserId}></Input>

          <Button
            onClick={() => {
              checkCredentials({accessToken, baseUrl: serverUrl, userId})

              void connect({accessToken, baseUrl: serverUrl, userId})
              login()
            }}
            label={"Sign In"}
          />

          <Button
            variant={ButtonVariant.TextLink}
            onClick={() => {}}
            label={"Forgot password?"}
          />
        </div>

        <div className="h-[1px] w-full bg-neutral-300" />

        <div className="flex flex-row items-center">
          <Typography variant={"span"} className="font-medium">
            Dont have an account?
          </Typography>
          <Button
            variant={ButtonVariant.TextLink}
            size={ButtonSize.Small}
            onClick={() => {}}
            label={"Sign up"}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginView
