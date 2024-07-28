import {StaticAssetPath} from "@/utils/util"
import {type FC} from "react"
import {ReactSVG} from "react-svg"
import Typography, {TypographyVariant} from "./Typography"

const AppLogo: FC = () => {
  return (
    <div className="flex w-max flex-col items-center">
      <ReactSVG src={StaticAssetPath.NewAppLogo} className="drop-shadow-sm" />

      <Typography
        className="font-unbounded font-bold"
        variant={TypographyVariant.BodyMedium}
        style={{color: "#D64DF4", textShadow: "#d54df433 0 1px 0"}}>
        MIRAGE
      </Typography>
    </div>
  )
}

export default AppLogo
