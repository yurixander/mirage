import {useEffect, useState} from "react"

type UseThemeReturnType = {
  handleSwitchTheme: () => void
  isDarkMode: boolean
}

const useTheme = (): UseThemeReturnType => {
  const salvedTheme = localStorage.getItem("darkMode")
  const isDarkMode = salvedTheme ? JSON.parse(salvedTheme) : false

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

  const handleSwitchTheme = (): void => {
    setIsDarkTheme(!isDarkTheme)
  }

  return {handleSwitchTheme, isDarkMode}
}

export default useTheme
