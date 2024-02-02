import {Config} from "postcss-load-config"

export default {
  plugins: [
    require("autoprefixer"),
    require("postcss-import"),
    require("tailwindcss"),
  ],
} satisfies Config
