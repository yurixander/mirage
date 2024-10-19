import AppLogo from "@/components/AppLogo"
import useTranslation from "@/hooks/util/useTranslation"
import {LangKey} from "@/lang/allKeys"
import type {FC} from "react"
import type {IconType} from "react-icons"
import {FaCompass, FaGithub, FaHand} from "react-icons/fa6"
import Typography, {TypographyVariant} from "../../components/Typography"

const WelcomeSplash: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 border-r border-stone-200">
      <div className="mb-6 flex flex-col items-center gap-3">
        <AppLogo />

        <div className="flex flex-col items-center">
          <Typography
            variant={TypographyVariant.Heading}
            className="text-black">
            {t(LangKey.WelcomeSplashTitle)}
          </Typography>

          <Typography className="mt-2 max-w-text text-center text-black">
            {t(LangKey.WelcomeSplashSubtitle)}
          </Typography>
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
      className="flex flex-col gap-3 rounded-md border border-slate-300 bg-gray-50 px-4 py-3 transition-transform hover:translate-y-1 hover:shadow-md"
      onClick={onClick}>
      <Icon className="fill-black" size={20} />

      <div>
        <Typography className="text-black" variant={TypographyVariant.Body}>
          {title}
        </Typography>

        <Typography
          className="text-black"
          variant={TypographyVariant.BodyMedium}>
          {subtitle}
        </Typography>
      </div>
    </button>
  )
}

export default WelcomeSplash
