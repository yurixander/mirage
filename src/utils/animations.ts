import {type Variants} from "framer-motion"

export const widthFillAnimNavigator: Variants = {
  initial: {width: 0},
  whileInView: {width: "100%"},
} as const

export const scaleInAnimation: Variants = {
  initial: {scale: 0.5, opacity: 0.5},
  whileInView: {scale: 1, opacity: 1},
}

export const spaceIndicatorAnimation: Variants = {
  default: {height: "0"},
  selected: {height: "var(--space-selected-indicator-height)"},
}

export const SLIDE_UP_SMALL_ANIM: Variants = {
  default: {
    translateY: "4rem",
    opacity: 0,
  },
  slideUp: {
    translateY: "0rem",
    opacity: 1,
  },
}
