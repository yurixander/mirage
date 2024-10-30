import {type FC} from "react"
import {type IconType} from "react-icons"
import {FaCompass, FaGithub, FaHand} from "react-icons/fa6"
import AppLogo from "@/components/AppLogo"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import {Heading, Text} from "@/components/ui/typography"

const WelcomeSplash: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 dark:bg-neutral-900">
      <div className="mb-6 flex flex-col items-center gap-3">
        <AppLogo />

        <div className="flex flex-col items-center">
          <Heading align="center" level="h2">
            {t(LangKey.WelcomeSplashTitle)}
          </Heading>

          <Text className="mt-2 max-w-text text-center">
            {t(LangKey.WelcomeSplashSubtitle)}
          </Text>
        </div>
      </div>

      <div className="flex gap-4">
        <GetStartedCard
          title={t(LangKey.ExploreServers)}
          subtitle={t(LangKey.ExploreServersSubtitle)}
          Icon={FaCompass}
          onClick={() => {
            // TODO: Handle here explore servers card click.
          }}
        />

        <GetStartedCard
          title={t(LangKey.SendAMessage)}
          subtitle={t(LangKey.SendAMessageSubtitle)}
          Icon={FaHand}
          onClick={() => {
            // TODO: Handle here send message card click.
          }}
        />

        <GetStartedCard
          title={t(LangKey.CheckoutGitHub)}
          subtitle={t(LangKey.CheckoutGitHubSubtitle)}
          Icon={FaGithub}
          onClick={() => {
            // TODO: Handle here checkout github card click.
          }}
        />
      </div>
    </div>
  )
}

type GetStartedCardProps = {
  title: string
  subtitle: string
  Icon: IconType
  onClick: () => void
}

const GetStartedCard: FC<GetStartedCardProps> = ({
  title,
  subtitle,
  Icon,
  onClick,
}) => {
  return (
    <button
      aria-label={`${title} - ${subtitle}`}
      className="flex cursor-pointer flex-col gap-3 rounded-md border border-neutral-300 bg-gray-50 px-4 py-3 transition-transform hover:translate-y-1 hover:shadow-md focus-visible:translate-y-2 focus-visible:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
      onClick={onClick}>
      <Icon
        aria-hidden
        className="fill-black dark:fill-neutral-400"
        size={20}
      />

      <div>
        <Heading level="h5" aria-hidden>
          {title}
        </Heading>

        <Text aria-hidden>{subtitle}</Text>
      </div>
    </button>
  )
}

export default WelcomeSplash
