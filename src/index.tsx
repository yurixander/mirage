import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {assert, ViewPath} from "./utils/util"
import AppView from "./views/app.jsx"
import DevPreview from "./views/dev"
import LoginView from "./views/login"

// Special imports.
import "./polyfills"
import "./styles/tailwind.css"

const $root = document.querySelector("#root")

assert($root !== null, "Root element should exist")

createRoot($root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ViewPath.App} element={<AppView />} />

        <Route path={ViewPath.Login} element={<LoginView />} />

        <Route path={ViewPath.Development} element={<DevPreview />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
