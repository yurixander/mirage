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
} from "@fortawesome/free-solid-svg-icons"
import Button, {ButtonColor, ButtonVariant} from "@/components/Button"
import useCachedCredentials from "@/hooks/matrix/useCachedCredentials"
import useConnection from "@/hooks/matrix/useConnection"
import {ViewPath} from "@/utils/util"
import {Link, useNavigate} from "react-router-dom"
import AppLogo from "@/components/AppLogo"

const LoginView: FC = () => {
  const navigate = useNavigate()
  const {credentials, saveCredentials} = useCachedCredentials()
  const [userId, setUserId] = useState("@thecriss:matrix.org")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [serverUrl, setServerUrl] = useState("https://matrix-client.matrix.org")

  const {connect, disconnect, syncState, lastSyncError, isConnecting} =
    useConnection()

  const [accessToken, setAccessToken] = useState(
    "syt_dGhlY3Jpc3M_yBPDvDMuDeMKQFonYlQM_09tZYX"
  )

  const login = useCallback(async () => {
    if (isConnecting) {
      return
    }

    const connectedAndSynced = await connect({
      accessToken,
      baseUrl: serverUrl,
      userId,
    })

    if (!connectedAndSynced) {
      return
    }

    saveCredentials({accessToken, baseUrl: serverUrl, userId})
    await disconnect()
    navigate(ViewPath.App)
  }, [
    accessToken,
    connect,
    disconnect,
    isConnecting,
    navigate,
    saveCredentials,
    serverUrl,
    userId,
  ])

  // Automatically login if credentials are cached.
  useEffect(() => {
    if (credentials === null) {
      return
    }

    void login()
  }, [credentials, login])

  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex size-96 flex-col justify-center gap-9">
        <div className="flex w-full justify-center">
          <div className="m-2 flex items-center">
            <AppLogo className="size-6" onClick={() => {}} />

            <div className="flex items-end font-iowan">
              <div>Mirage</div>

              <span className="ml-[2px] text-xs italic">©</span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <Typography variant={TypographyVariant.H2} className="font-bold">
            Welcome Back
          </Typography>

          <Typography>Enter your email and password to</Typography>
          <Typography>access your account</Typography>
        </div>
        <div className="flex size-full flex-col justify-center gap-4">
          <div className="flex w-full flex-col gap-1">
            <Typography variant={TypographyVariant.Span}>Server URL</Typography>

            <Input
              className="w-full"
              icon={faLink}
              placeholder={"https://matrix-client.matrix.org"}
              constraints={[urlConstraint, nonEmptyConstraint]}
              initialValue={serverUrl}
              onValueChange={setServerUrl}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Typography variant={TypographyVariant.Span}>
              Access token
            </Typography>

            <Input
              className="w-full"
              placeholder={"syt_dGhlY3Jpc3M_PAmQdRhKFWPaexp_0iK0SN"}
              initialValue={accessToken}
              onValueChange={setAccessToken}
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
              placeholder={"@userId:matrix.org"}
              constraints={[userIdConstraint, nonEmptyConstraint]}
              onValueChange={setUserId}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Button
              label={isConnecting ? "Connecting..." : "Sign in →"}
              isDisabled={syncState !== null}
              isLoading={isConnecting}
              onClick={() => {
                void login()
              }}
              color={ButtonColor.Black}
            />

            {/* FIXME: This is temporary. Remove later on. */}
            <div>{lastSyncError?.message ?? "Waiting for login."}</div>

            <Button
              onClick={() => {}}
              label={"Forgot password?"}
              variant={ButtonVariant.TextLink}
              color={ButtonColor.Black}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-1">
          <Typography>Don&apos;t have an account?</Typography>

          <Link to={""}>
            <Typography className="font-bold">Sign up</Typography>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginView
