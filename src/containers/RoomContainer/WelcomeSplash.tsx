import {type FC} from "react"
import {type IconType} from "react-icons"
import {FaCompass, FaGithub, FaHand} from "react-icons/fa6"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "@/components/ui/typography"
import {StaticAssetPath} from "@/utils/util"

const WelcomeSplash: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-8 overflow-y-scroll dark:bg-neutral-900">
      <div className="flex flex-col items-center gap-3">
        <img
          src={StaticAssetPath.AppLogo}
          alt="Mirage logo"
          className="size-16"
        />

        <div className="flex flex-col items-center">
          <Heading align="center" level="h2">
            {t(LangKey.WelcomeSplashTitle)}
          </Heading>

          <Text className="mt-2 max-w-text text-center">
            {t(LangKey.WelcomeSplashSubtitle)}
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-center xl:flex-row">
        <GetStartedCard
          title={t(LangKey.ExploreServers)}
          subtitle={t(LangKey.ExploreServersSubtitle)}
          Icon={FaCompass}
        />

        <GetStartedCard
          title={t(LangKey.SendAMessage)}
          subtitle={t(LangKey.SendAMessageSubtitle)}
          Icon={FaHand}
        />

        <GetStartedCard
          title={t(LangKey.CheckoutGitHub)}
          subtitle={t(LangKey.CheckoutGitHubSubtitle)}
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
}

const GetStartedCard: FC<GetStartedCardProps> = ({title, subtitle, Icon}) => {
  return (
    <button
      aria-label={`${title} - ${subtitle}`}
      className="flex min-w-64 cursor-default flex-col gap-3 rounded-md border border-neutral-300 bg-gray-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
      <Icon className="fill-black dark:fill-neutral-400" size={20} />

      <div className="flex flex-col">
        <Heading align="left" level="h5">
          {title}
        </Heading>

        <Text>{subtitle}</Text>
      </div>
    </button>
  )
}

export default WelcomeSplash
