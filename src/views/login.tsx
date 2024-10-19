import AppLogo from "@/components/AppLogo"
import {
  type InputConstraint,
  nonEmptyConstraint,
  userIdConstraint,
} from "@/components/Input"
import Typography, {TypographyVariant} from "@/components/Typography"
import {Button} from "@/components/ui/button"
import {type InputIconActionProps, InputWithIcon} from "@/components/ui/input"
import useLogin from "@/hooks/util/useLogin"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {StaticAssetPath} from "@/utils/util"
import {type FC, useState} from "react"
import type {IconType} from "react-icons"
import {IoIosContact} from "react-icons/io"
import {IoEye, IoEyeOff, IoKey} from "react-icons/io5"
import {Link} from "react-router-dom"

const LoginView: FC = () => {
  const {t} = useTranslation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const {lastSyncError, login, setPassword, setUserId, isConnecting} =
    useLogin()

  return (
    <div className="flex size-full max-h-screen items-center justify-center p-6">
      {/* Decorative background */}
      <div className="hidden h-full items-center justify-center sm:flex">
        <img
          className="max-h-full max-w-full object-contain"
          src={StaticAssetPath.LoginPhoto}
          alt={t(LangKey.DecorativeBackgroundAlt)}
        />
      </div>

      {/* Login form */}
      <div className="h-screen max-w-[500px] overflow-y-auto">
        <div className="flex h-full min-h-[500px] max-w-[500px] flex-col gap-2 p-6">
          <div className="flex h-full grow flex-col justify-center gap-6 p-3">
            <div className="flex w-full items-center justify-center">
              <AppLogo />
            </div>

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
                ariaLabel={t(LangKey.UserID)}
              />

              <InputSection
                title={t(LangKey.Password)}
                onValueChange={setPassword}
                icon={IoKey}
                placeholder={t(LangKey.Password)}
                isPassword={!isPasswordVisible}
                actions={{
                  tooltip: isPasswordVisible
                    ? t(LangKey.HideToken)
                    : t(LangKey.ShowToken),
                  Icon: isPasswordVisible ? IoEyeOff : IoEye,
                  onClick: () => {
                    setIsPasswordVisible(!isPasswordVisible)
                  },
                }}
                ariaLabel={t(LangKey.Password)}
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
    </div>
  )
}

type InputSectionProps = {
  title: string
  onValueChange: (value: string) => void
  icon: IconType
  placeholder: string
  constraints?: InputConstraint[]
  actions?: InputIconActionProps
  isPassword?: boolean
  ariaLabel?: string
}

const InputSection: FC<InputSectionProps> = ({
  icon,
  onValueChange,
  title,
  actions,
  constraints,
  placeholder,
  isPassword,
  ariaLabel,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography className="font-medium">{title}</Typography>

      <InputWithIcon
        inputProps={{
          placeholder,
          type: isPassword === true ? "password" : "text",
          autoCapitalize: "none",
          autoComplete: "off",
          spellCheck: false,
        }}
        onValueChange={onValueChange}
        ariaLabel={ariaLabel}
        Icon={icon}
        action={actions}
        constraints={constraints}
      />
    </div>
  )
}

export default LoginView
