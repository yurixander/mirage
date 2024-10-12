import {type Variants} from "framer-motion"

export const widthFillAnimNavigator: Variants = {
  initial: {width: 0},
  whileInView: {width: "100%"},
} as const
