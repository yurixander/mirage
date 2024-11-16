import {useState} from "react"

type UseThemeReturnType = {
  handleSwitchTheme: () => void
  theme: string
}

const useTheme = (): UseThemeReturnType => {
  let theme = localStorage.getItem("theme")

  if (theme === null) {
    theme = ""
  }

  const [isDarkTheme, setIsDarkTheme] = useState(theme !== "dark")

  document.querySelectorAll("html")[0].className = isDarkTheme ? "dark" : ""

  const handleSwitchTheme = (): void => {
    setIsDarkTheme(prevIsDarkTheme => !prevIsDarkTheme)
    localStorage.setItem("theme", isDarkTheme ? "dark" : "")
  }

  return {handleSwitchTheme, theme}
}

export default useTheme
