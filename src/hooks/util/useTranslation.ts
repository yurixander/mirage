import {type LangKey, type Lang, t} from "@/utils/lang"
import {create} from "zustand/react"

type TranslationStore = {
  lang: Lang
  setActiveLang: (lang: Lang) => void
  t: (key: LangKey, ...args: string[]) => string
}

const useTranslation = create<TranslationStore>(set => ({
  lang: "en",
  setActiveLang(lang) {
    set(_state => ({lang}))
  },
  t(key, ...args) {
    return t(key, this.lang, ...args)
  },
}))

export default useTranslation
