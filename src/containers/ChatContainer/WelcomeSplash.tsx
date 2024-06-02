import {type FC} from "react"
import Typography, {TypographyVariant} from "../../components/Typography"
import {ReactSVG} from "react-svg"
import {StaticAssetPath} from "@/utils/util"
import {type IconType} from "react-icons"
import {FaCompass, FaGithub, FaHand} from "react-icons/fa6"

const WelcomeSplash: FC = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 border-r border-stone-200">
      <div className="mb-6 flex flex-col items-center">
        <ReactSVG src={StaticAssetPath.AppLogo} />

        <Typography variant={TypographyVariant.HeadingLarge}>
          Welcome to Mirage
        </Typography>

        <Typography className="max-w-text mt-2 text-center">
          Invite your friends to chat! Select a Room or a Direct Messages to
          start a conversation. You can also select an action below to get
          started quickly.
        </Typography>
      </div>

      <div className="flex gap-4">
        <GetStartedCard
          title="Explore Servers"
          subtitle="join a relevant community"
          Icon={FaCompass}
        />

        <GetStartedCard
          title="Send a message"
          subtitle="to a colleague or friend"
          Icon={FaHand}
        />

        <GetStartedCard
          title="Checkout GitHub"
          subtitle="to view latest updates"
          Icon={FaGithub}
        />
      </div>
    </div>
  )
}

type GetStartedCardProps = {
  title: string
  subtitle: string
  Icon: IconType
  // TODO: Add `href` or `onClick` properties.
}

const GetStartedCard: FC<GetStartedCardProps> = ({title, subtitle, Icon}) => {
  return (
    <div className="-hover:translate-y-1 flex cursor-pointer flex-col gap-3 rounded-md border border-gray-300 p-4 transition-all hover:bg-gray-50 hover:shadow-md">
      <Icon className="fill-gray-500" size={24} />

      <div>
        <Typography variant={TypographyVariant.Heading}>{title}</Typography>

        <Typography>{subtitle}</Typography>
      </div>
    </div>
  )
}

export default WelcomeSplash
