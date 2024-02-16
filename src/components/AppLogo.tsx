import {type FC} from "react"
import {twMerge} from "tailwind-merge"

type AppLogoProps = {
  className?: string
  onClick: () => void
}

const AppLogo: FC<AppLogoProps> = ({className, onClick}) => {
  return (
    <>
      <svg
        className={twMerge("cursor-pointer", className)}
        onClick={onClick}
        width="58"
        height="58"
        viewBox="0 0 142 142"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M105.097 34.7245L119.307 82.6626L84.8964 118.938L36.2756 107.276L22.0652 59.3375L56.4757 23.0619L105.097 34.7245Z"
          fill="url(#paint0_linear_4_215)"
        />
        <path
          d="M71 38L79.8671 62.1329L104 71L79.8671 79.8671L71 104L62.1329 79.8671L38 71L62.1329 62.1329L71 38Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_4_215"
            x1="41"
            y1="45"
            x2="100"
            y2="99.5"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#CB77FF" />
            <stop offset="1" stopColor="#B640FF" />
          </linearGradient>
        </defs>
      </svg>
    </>
  )
}

export default AppLogo
