import "./styles/global.sass"
import "./polyfills"
import LoginPage from "./pages/Login"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AppPage from "./pages/App"
import {createRoot} from "react-dom/client"
import {StrictMode} from "react"
import {Path, assert} from "./util"

const $root = document.getElementById("root")

assert($root !== null, "root element should exist")

createRoot($root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={Path.App} element={<AppPage />} />
        <Route path={Path.Login} caseSensitive element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
