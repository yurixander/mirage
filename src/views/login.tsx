import Input, {
  nonEmptyConstraint,
  urlConstraint,
  userIdConstraint,
} from "@/components/Input"
import Typography, {TypographyVariant} from "@/components/Typography"
import {useCallback, useEffect, useState, type FC} from "react"
import {
  faEyeSlash,
  faEye,
  faLink,
  faUserCircle,
  faKey,
} from "@fortawesome/free-solid-svg-icons"
import Button, {ButtonColor, ButtonVariant} from "@/components/Button"
import useCachedCredentials from "@/hooks/matrix/useCachedCredentials"
import useConnection from "@/hooks/matrix/useConnection"
import {StaticAssetPath, ViewPath} from "@/utils/util"
import {Link, useNavigate} from "react-router-dom"
import {SyncState} from "matrix-js-sdk"
import {ReactSVG} from "react-svg"

const LoginView: FC = () => {
  const navigate = useNavigate()
  const {credentials, saveCredentials} = useCachedCredentials()
  const [userId, setUserId] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [baseUrl, setBaseUrl] = useState("")
  const [accessToken, setAccessToken] = useState("")

  const {connect, disconnect, syncState, lastSyncError, isConnecting} =
    useConnection()

  const login = useCallback(async () => {
    if (isConnecting) {
      return
    }

    const connectedAndSynced = await connect({
      accessToken,
      baseUrl,
      userId,
    })

    if (!connectedAndSynced) {
      return
    }

    saveCredentials({accessToken, baseUrl, userId})
    await disconnect()
    navigate(ViewPath.App)
  }, [
    accessToken,
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
    if (credentials === null || isConnecting || syncState === SyncState.Error) {
      return
    }

    void connect({...credentials}).then(async connectedAndSynced => {
      if (!connectedAndSynced) {
        return
      }

      await disconnect()
      navigate(ViewPath.App)
    })
  }, [connect, credentials, disconnect, isConnecting, navigate, syncState])

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex size-full max-h-[900px] max-w-[900px] gap-16 p-6">
        <div className="flex grow flex-col justify-center gap-6 p-3">
          <div className="flex w-full justify-center">
            <div className="m-2 flex items-center">
              <ReactSVG src={StaticAssetPath.AppLogoSmall} />

              <div className="flex items-end font-iowan">
                <div>Mirage</div>

                <span className="ml-[2px] text-xs italic">©</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant={TypographyVariant.H2} className="font-bold">
              Welcome Back
            </Typography>

            <Typography>
              Enter your email and password to
              <br />
              access your account
            </Typography>
          </div>

          <div className="flex size-full flex-col justify-center gap-2">
            <div className="flex w-full flex-col gap-1">
              <Typography variant={TypographyVariant.Span}>
                Server URL
              </Typography>

              <Input
                className="w-full"
                icon={faLink}
                placeholder="https://matrix-client.matrix.org"
                constraints={[urlConstraint, nonEmptyConstraint]}
                initialValue={baseUrl}
                onValueChange={setBaseUrl}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant={TypographyVariant.Span}>
                Access token
              </Typography>

              <Input
                className="w-full"
                placeholder="syt_dGhlY3Jpc3M_PAmQdRhKFWPaexp_0iK0SN"
                initialValue={accessToken}
                onValueChange={setAccessToken}
                icon={faKey}
                actions={[
                  {
                    tooltip: isPasswordVisible ? "Hide token" : "Show token",
                    icon: isPasswordVisible ? faEyeSlash : faEye,
                    onClick: () => {
                      setIsPasswordVisible(!isPasswordVisible)
                    },
                  },
                ]}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant={TypographyVariant.Span}>User ID</Typography>

              <Input
                initialValue={userId}
                className="w-full"
                icon={faUserCircle}
                placeholder="@userId:matrix.org"
                constraints={[userIdConstraint, nonEmptyConstraint]}
                onValueChange={setUserId}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Button
                label={isConnecting ? "Connecting..." : "Sign in →"}
                isDisabled={syncState !== null && syncState !== SyncState.Error}
                isLoading={isConnecting}
                onClick={() => {
                  void login()
                }}
              />

              {/* FIXME: This is temporary. Remove later on. */}
              <div>{lastSyncError?.message ?? "Waiting for login."}</div>

              <Button
                onClick={() => {}}
                label="Forgot password?"
                variant={ButtonVariant.TextLink}
                color={ButtonColor.Black}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-1">
            <Typography>Don&apos;t have an account?</Typography>

            <Link to="">
              <Typography className="font-bold">Sign up</Typography>
            </Link>
          </div>
        </div>

        <div className="flex grow overflow-hidden rounded-xl">
          <img
            className="object-fill"
            src={StaticAssetPath.LoginPhoto}
            alt="Matrix Protocol, that connects you to the world"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginView
