import {type FC} from "react"
import Typography, {TypographyVariant} from "./Typography"
import {ReactSVG} from "react-svg"
import {StaticAssetPath} from "@/utils/util"

const WelcomeChatContainer: FC = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <ReactSVG src={StaticAssetPath.AppLogo} />

      <Typography variant={TypographyVariant.H1}>Welcome to Mirage</Typography>

      <Typography className="text-center" variant={TypographyVariant.Span}>
        Chat with friends, family, the whole world, select a Room or a direct
        chat and start a conversation
      </Typography>
    </div>
  )
}

export default WelcomeChatContainer