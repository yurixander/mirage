import Input, {urlConstraint, userIdConstraint} from "@/components/Input"
import Typography from "@/components/Typography"
import {useState, type FC} from "react"
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons"
import Button, {ButtonSize, ButtonVariant} from "@/components/Button"
import useClient from "@/hooks/matrix/useClient"
import {MatrixClient} from "matrix-js-sdk"

const Login: FC = () => {
  const [serverUrl, setServerUrl] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [userId, setUserId] = useState("")
  const [isPassShowed, setIsPassShowed] = useState(false)

  const {connect} = useClient()

  const handleSignIn = async () => {
    try {
      await connect(serverUrl, accessToken, userId)
      throw new Error("Connected")
    } catch (error) {
      throw new Error("Fatal error")
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-80 flex-col items-center justify-center gap-4">
        <div className="flex w-72 flex-col gap-4 p-4">
          <Typography variant={"h3"}>Sign In Now!</Typography>
          <Input
            constraints={[urlConstraint]}
            placeholder={"Server url"}
            onValueChange={setServerUrl}></Input>
          <Input
            placeholder={"Access token"}
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
            constraints={[userIdConstraint]}
            placeholder={"User ID"}
            onValueChange={setUserId}></Input>

          <Button
            onClick={function (): void {
              throw new Error("Function not implemented.")
            }}
            label={"Sign In"}
          />

          <Button
            variant={ButtonVariant.TextLink}
            onClick={function (): void {
              throw new Error("Function not implemented.")
            }}
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
            onClick={() => {
              void handleSignIn()
            }}
            label={"Sign up"}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
