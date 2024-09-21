import Input, {
  type InputAction,
  type InputConstraint,
  nonEmptyConstraint,
  userIdConstraint,
} from "@/components/Input"
import Typography, {TypographyVariant} from "@/components/Typography"
import {useState, type FC} from "react"
import {StaticAssetPath} from "@/utils/util"
import {Link} from "react-router-dom"
import {ReactSVG} from "react-svg"
import {IoIosContact} from "react-icons/io"
import {IoEye, IoEyeOff, IoKey} from "react-icons/io5"
import useLogin from "@/hooks/util/useLogin"
import {type IconType} from "react-icons"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Button} from "@/components/ui/button"

const LoginView: FC = () => {
  const {t} = useTranslation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const {lastSyncError, login, setPassword, setUserId, isConnecting} =
    useLogin()

  return (
    <div className="flex size-full max-h-screen items-center justify-center p-6">
      {/* Decorative background */}
      <div className="flex h-full items-center justify-center">
        <img
          className="max-h-full max-w-full object-contain"
          src={StaticAssetPath.LoginPhoto}
          alt={t(LangKey.DecorativeBackgroundAlt)}
        />
      </div>

      {/* Login form */}
      <div className="h-full max-w-[500px] p-6">
        <div className="flex h-full grow flex-col justify-center gap-6 p-3">
          <Logo />

          {/* Welcome message */}
          <div className="flex flex-col items-center">
            <Typography
              variant={TypographyVariant.HeadingLarge}
              className="text-center">
              {t(LangKey.WelcomeBack)}
            </Typography>

            <Typography className="mt-4 text-center">
              {t(LangKey.LoginSubtitleInfo)}
            </Typography>
          </div>

          {/* Controls */}
          <div className="flex flex-col justify-center gap-2">
            <InputSection
              title={t(LangKey.UserID)}
              onValueChange={setUserId}
              icon={IoIosContact}
              placeholder="@userId:matrix.org"
              constraints={[userIdConstraint, nonEmptyConstraint]}
            />

            <InputSection
              title={t(LangKey.Password)}
              onValueChange={setPassword}
              icon={IoKey}
              placeholder={t(LangKey.Password)}
              isPassword={!isPasswordVisible}
              actions={[
                {
                  tooltip: isPasswordVisible
                    ? t(LangKey.HideToken)
                    : t(LangKey.ShowToken),
                  icon: isPasswordVisible ? IoEyeOff : IoEye,
                  onClick: () => {
                    setIsPasswordVisible(!isPasswordVisible)
                  },
                },
              ]}
            />

            <div className="flex flex-col gap-1">
              <Button
                disabled={isConnecting}
                aria-label={t(LangKey.SignIn)}
                onClick={() => {
                  void login().catch((error: Error) => {
                    throw error
                  })
                }}>
                {isConnecting ? t(LangKey.Connecting) : t(LangKey.SignIn)}
              </Button>

              {/* FIXME: This is temporary. Remove later on. */}
              {lastSyncError !== null && <div>{lastSyncError.message}</div>}

              <Button
                variant="link"
                aria-label={t(LangKey.ForgotPassword)}
                onClick={() => {
                  throw new Error("Forgot password link not implemented")
                }}>
                {t(LangKey.ForgotPassword)}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom sign up link */}
        <div className="flex w-full items-center justify-center gap-1">
          <Typography>{t(LangKey.NoAccountText)}</Typography>

          {/* TODO: Provide link. */}
          <Link to="">
            <Typography className="font-bold">{t(LangKey.SignUp)}</Typography>
          </Link>
        </div>
      </div>
    </div>
  )
}

const Logo: FC = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="m-2 flex items-center">
        <ReactSVG src={StaticAssetPath.AppLogoSmall} />

        <div className="flex items-end font-iowan">
          <div>Mirage</div>

          <span className="ml-0.5 text-xs italic">©</span>
        </div>
      </div>
    </div>
  )
}

type InputSectionProps = {
  title: string
  onValueChange: (value: string) => void
  icon: IconType
  placeholder: string
  constraints?: InputConstraint[]
  actions?: InputAction[]
  isPassword?: boolean
}

const InputSection: FC<InputSectionProps> = ({
  icon,
  onValueChange,
  title,
  actions,
  constraints,
  placeholder,
  isPassword,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography className="font-medium">{title}</Typography>

      <Input
        className="w-full"
        placeholder={placeholder}
        onValueChange={onValueChange}
        Icon={icon}
        actions={actions}
        constraints={constraints}
        type={isPassword === true ? "password" : "text"}
      />
    </div>
  )
}

export default LoginView
