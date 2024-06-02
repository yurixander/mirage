import Input, {
  type InputAction,
  type InputConstraint,
  nonEmptyConstraint,
  userIdConstraint,
} from "@/components/Input"
import Typography, {TypographyVariant} from "@/components/Typography"
import {useState, type FC} from "react"
import Button, {ButtonVariant} from "@/components/Button"
import {StaticAssetPath} from "@/utils/util"
import {Link} from "react-router-dom"
import {ReactSVG} from "react-svg"
import {IoIosContact} from "react-icons/io"
import {IoEye, IoEyeOff, IoKey} from "react-icons/io5"
import useLogin from "@/hooks/util/useLogin"
import {type IconType} from "react-icons"

const LoginView: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const {
    lastSyncError,
    login,
    setPassword,
    setUserId,
    syncState,
    isConnecting,
  } = useLogin()

  return (
    <div className="flex size-full max-h-screen items-center justify-center p-6">
      {/* Decorative background */}
      <div className="flex h-full items-center justify-center">
        <img
          className="max-h-full max-w-full object-contain"
          src={StaticAssetPath.LoginPhoto}
          alt="Abstract background for login page"
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
              Welcome Back
            </Typography>

            <Typography className="mt-4 text-center">
              Glad to see you here! Already have an account? Please enter your
              email and password to sign in.
            </Typography>
          </div>

          {/* Controls */}
          <div className="flex flex-col justify-center gap-2">
            <InputSection
              title="User ID"
              onValueChange={setUserId}
              icon={IoIosContact}
              placeholder="@userId:matrix.org"
              constraints={[userIdConstraint, nonEmptyConstraint]}
            />

            <InputSection
              title="Password"
              onValueChange={setPassword}
              icon={IoKey}
              placeholder="Password"
              isPassword={!isPasswordVisible}
              actions={[
                {
                  tooltip: isPasswordVisible ? "Hide token" : "Show token",
                  icon: isPasswordVisible ? IoEyeOff : IoEye,
                  onClick: () => {
                    setIsPasswordVisible(!isPasswordVisible)
                  },
                },
              ]}
            />

            <div className="flex flex-col gap-1">
              <Button
                label={isConnecting ? "Connecting..." : "Sign in →"}
                isDisabled={syncState === null}
                isLoading={isConnecting}
                onClick={() => {
                  void login()
                }}
              />

              {/* FIXME: This is temporary. Remove later on. */}
              {lastSyncError !== null && <div>{lastSyncError.message}</div>}

              <Button
                onClick={() => {}}
                label="Forgot password?"
                variant={ButtonVariant.TextLink}
              />
            </div>
          </div>
        </div>

        {/* Bottom sign up link */}
        <div className="flex w-full items-center justify-center gap-1">
          <Typography>Don&apos;t have an account?</Typography>

          {/* TODO: Provide link. */}
          <Link to="">
            <Typography className="font-bold">Sign up</Typography>
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

          <span className="ml-[2px] text-xs italic">©</span>
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
