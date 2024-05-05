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
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex size-full max-h-[900px] max-w-4xl gap-16 p-6">
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

            <Typography className="text-center">
              Enter your email and password to
              <br />
              access your account
            </Typography>
          </div>

          <div className="flex size-full flex-col justify-center gap-2">
            <LoginInputSection
              title="User ID"
              onValueChange={setUserId}
              icon={IoIosContact}
              placeholder="@userId:matrix.org"
              constraints={[userIdConstraint, nonEmptyConstraint]}
            />

            <LoginInputSection
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

type LoginInputSectionProps = {
  title: string
  onValueChange: (value: string) => void
  icon: IconType
  placeholder: string
  constraints?: InputConstraint[]
  actions?: InputAction[]
  isPassword?: boolean
}

const LoginInputSection: FC<LoginInputSectionProps> = ({
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
      <Typography variant={TypographyVariant.Span}>{title}</Typography>

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
