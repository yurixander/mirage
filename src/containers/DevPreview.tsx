import AppLogo from "@/components/AppLogo"
import Button, {ButtonColor, ButtonVariant} from "@/components/Button"
import Input, {
  urlConstraint,
  nonEmptyConstraint,
  userIdConstraint,
} from "@/components/Input"
import Typography, {TypographyVariant} from "@/components/Typography"
import {
  faLink,
  faEye,
  faUserCircle,
  faKey,
} from "@fortawesome/free-solid-svg-icons"
import {type FC} from "react"
import {Link} from "react-router-dom"

const DevPreview: FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex size-full max-h-[900px] max-w-[900px] gap-16 p-6">
        <div className="flex grow flex-col justify-center gap-6 p-3">
          <div className="flex w-full justify-center">
            <div className="m-2 flex items-center">
              <AppLogo className="size-6" onClick={() => {}} />

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

            <Typography>Enter your email and password to</Typography>
            <Typography>access your account</Typography>
          </div>
          <div className="flex size-full flex-col justify-center gap-2">
            <div className="flex w-full flex-col gap-1">
              <Typography variant={TypographyVariant.Span}>
                Server URL
              </Typography>

              <Input
                className="w-full"
                icon={faLink}
                placeholder={"https://matrix-client.matrix.org"}
                constraints={[urlConstraint, nonEmptyConstraint]}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant={TypographyVariant.Span}>
                Access token
              </Typography>

              <Input
                className="w-full"
                placeholder={"syt_dGhlY3Jpc3M_PAmQdRhKFWPaexp_0iK0SN"}
                icon={faKey}
                actions={[
                  {
                    tooltip: "Show token",
                    icon: faEye,
                    onClick: () => {},
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant={TypographyVariant.Span}>User ID</Typography>

              <Input
                className="w-full"
                icon={faUserCircle}
                placeholder={"@userId:matrix.org"}
                constraints={[userIdConstraint, nonEmptyConstraint]}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Button
                label={"Sign in →"}
                onClick={() => {}}
                color={ButtonColor.Black}
              />

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

        <div className="flex grow overflow-hidden rounded-xl">
          <img className="object-fill" src="../../public/LoginPhoto.png" />
        </div>
      </div>
    </div>
  )
}

export default DevPreview
