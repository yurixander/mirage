import {type FC} from "react"
import Typography, {type TypographyVariant} from "./Typography"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {trim} from "@/utils/util"

export type TruncatedTextWithTooltipProps = {
  text: string
  maxLength: number
  delayDuration?: number
  style?: React.CSSProperties
  variant?: TypographyVariant
  as?: keyof React.JSX.IntrinsicElements
}

const TruncatedTextWithTooltip: FC<TruncatedTextWithTooltipProps> = ({
  maxLength,
  text,
  as,
  style,
  variant,
  delayDuration,
}) => {
  const exceedsLimit = text.length > maxLength

  return exceedsLimit ? (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger aria-label={text}>
          <Typography as={as} className="w-max" style={style} variant={variant}>
            {trim(text, maxLength)}
          </Typography>
        </TooltipTrigger>

        <TooltipContent aria-hidden>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Typography style={style} variant={variant}>
      {text}
    </Typography>
  )
}

export default TruncatedTextWithTooltip
