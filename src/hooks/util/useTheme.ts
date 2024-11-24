import {useCallback, useEffect, useState} from "react"

type UseThemeReturnType = {
  toggleTheme: () => void
  isDarkMode: boolean
}

const useTheme = (): UseThemeReturnType => {
  const savedTheme = localStorage.getItem("darkMode")
  const isDarkMode = savedTheme ? JSON.parse(savedTheme) : false

  const [isDarkTheme, setIsDarkTheme] = useState(isDarkMode)

  useEffect(() => {
    const html = document.documentElement

    if (isDarkTheme) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }

    localStorage.setItem("darkMode", JSON.stringify(isDarkTheme))
  }, [isDarkTheme])

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme)
  }, [isDarkTheme])

  return {toggleTheme, isDarkMode}
}

export default useTheme
