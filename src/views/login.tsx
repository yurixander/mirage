import Input, {urlConstraint, userIdConstraint} from "@/components/Input"
import Typography, {TypographyVariant} from "@/components/Typography"
import {useEffect, useState, type FC} from "react"
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons"
import Button, {ButtonSize, ButtonVariant} from "@/components/Button"
import useCachedCredentials from "@/hooks/matrix/useCachedCredentials"
import useConnection from "@/hooks/matrix/useConnection"
import {ViewPath} from "@/utils/util"
import {useNavigate} from "react-router-dom"

const LoginView: FC = () => {
  const navigate = useNavigate()
  const {credentials, saveCredentials} = useCachedCredentials()
  const {connect, disconnect, isSynced, syncError} = useConnection()
  const [serverUrl, setServerUrl] = useState("https://matrix-client.matrix.org")

  const [accessToken, setAccessToken] = useState(
    "syt_dGhlY3Jpc3M_yBPDvDMuDeMKQFonYlQM_09tZYX"
  )

  const [userId, setUserId] = useState("@thecriss:matrix.org")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const login = async () => {
    setIsConnecting(true)

    const connectedAndSynced = await connect({
      accessToken,
      baseUrl: serverUrl,
      userId,
    })

    if (!connectedAndSynced) {
      setIsConnecting(false)

      return
    }

    saveCredentials({accessToken, baseUrl: serverUrl, userId})
    await disconnect()
    navigate(ViewPath.Development)
  }

  // Automatically login if credentials are cached.
  useEffect(() => {
    if (credentials === null || !isSynced) {
      return
    }

    void login()
  }, [credentials, isSynced])

  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex w-80 flex-col items-center justify-center gap-4">
        <div className="flex w-72 flex-col gap-4 p-4">
          <Typography variant={TypographyVariant.H3}>Sign In Now!</Typography>

          <Input
            initialValue={serverUrl}
            constraints={[urlConstraint]}
            placeholder="Server URL"
            onValueChange={setServerUrl}
          />

          <Input
            placeholder="Access token"
            initialValue={accessToken}
            onValueChange={setAccessToken}
            actions={[
              {
                tooltip: isPasswordVisible ? "Hide password" : "Show password",
                icon: isPasswordVisible ? faEyeSlash : faEye,
                onClick: () => {
                  setIsPasswordVisible(!isPasswordVisible)
                },
              },
            ]}
          />

          <Input
            initialValue={userId}
            constraints={[userIdConstraint]}
            placeholder="User ID"
            onValueChange={setUserId}
          />

          <Button
            label={isConnecting ? "Connecting..." : "Sign in"}
            isDisabled={isSynced}
            isLoading={isConnecting}
            onClick={() => {
              void login()
            }}
          />

          {/* FIXME: This is temporary. Remove later on. */}
          <div>{syncError?.message ?? "Waiting for login."}</div>

          <Button
            variant={ButtonVariant.TextLink}
            onClick={() => {}}
            label="Forgot password?"
          />
        </div>

        <div className="h-[1px] w-full bg-neutral-300" />

        <div className="flex flex-row items-center">
          <Typography className="font-medium">
            Don&apos;t have an account?
          </Typography>

          <Button
            variant={ButtonVariant.TextLink}
            size={ButtonSize.Small}
            onClick={() => {}}
            label="Sign up"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginView
