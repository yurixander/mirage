import {type Variants} from "framer-motion"

export const scaleInAnimation: Variants = {
  initial: {scale: 0.5, opacity: 0.5},
  whileInView: {scale: 1, opacity: 1},
}
