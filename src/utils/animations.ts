import {type Variants} from "framer-motion"

export const scaleInAnimation: Variants = {
  initial: {scale: 0.5, opacity: 0.5},
  whileInView: {scale: 1, opacity: 1},
}

export const spaceIndicatorAnimation: Variants = {
  default: {height: "0"},
  selected: {height: "var(--space-selected-indicator-height)"},
}