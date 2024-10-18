import type {LangKey} from "@/lang/allKeys"
import {
  getDefaultLang,
  type Lang,
  setDefaultLang,
  translate,
} from "@/utils/lang"
import {create} from "zustand"

type TranslationStore = {
  lang: Lang
  setActiveLang: (lang: Lang) => void
  t: (key: LangKey, ...args: string[]) => string
}

const useTranslation = create<TranslationStore>((set, get) => ({
  lang: getDefaultLang(),
  setActiveLang(lang) {
    setDefaultLang(lang)

    set(_state => ({lang}))
  },
  t(key, ...args) {
    return translate(key, get().lang, ...args)
  },
}))

export default useTranslation
