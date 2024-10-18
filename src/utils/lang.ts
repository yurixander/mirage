import {LocalStorageKey} from "@/hooks/util/useLocalStorage"
import type {LangKey} from "@/lang/allKeys"
import {english} from "@/lang/english"
import {spanish} from "@/lang/spanish"

export type Lang = "en" | "es"

export type LangDefinition = Record<
  LangKey,
  string | ((...args: string[]) => string)
>

export const translations: Record<Lang, LangDefinition> = {
  en: english,
  es: spanish,
}

export function getDefaultLang(): Lang {
  const lang = localStorage.getItem(LocalStorageKey.Lang)

  try {
    return lang === null ? "en" : JSON.parse(lang)
  } catch {
    return "en"
  }
}

export function setDefaultLang(lang: Lang): void {
  localStorage.setItem(LocalStorageKey.Lang, JSON.stringify(lang))
}

export function t(key: LangKey, ...args: string[]): string {
  const lang = getDefaultLang()
  const translationLang = translations[lang]
  const translation = translationLang[key]

  if (typeof translation === "function") {
    return translation(...args)
  }

  return translation
}

export function translate(key: LangKey, lang: Lang, ...args: string[]): string {
  const translationLang = translations[lang]
  const translation = translationLang[key]

  if (typeof translation === "function") {
    return translation(...args)
  }

  return translation
}
