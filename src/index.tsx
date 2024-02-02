import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./polyfills"
import "./styles/global.sass"
import {assert} from "./utils/util"
import AppView from "./views/app.jsx"
import LoginView from "./views/login"

const $root = document.getElementById("root")

assert($root !== null, "Root element should exist")

createRoot($root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppView />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
