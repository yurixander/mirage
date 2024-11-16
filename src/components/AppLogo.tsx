import {StaticAssetPath} from "@/utils/util"
import {type FC} from "react"
import {Heading} from "./ui/typography"

const AppLogo: FC = () => {
  return (
    <div className="flex w-max flex-col items-center gap-y-2">
      <img
        src={StaticAssetPath.AppLogo}
        className="size-16 drop-shadow-sm"
        alt="mirage logo"
      />

      <Heading
        level="h6"
        weight="bold"
        className="font-unbounded uppercase"
        style={{color: "#D64DF4", textShadow: "#d54df433 0 1px 0"}}>
        Mirage
      </Heading>
    </div>
  )
}

export default AppLogo
