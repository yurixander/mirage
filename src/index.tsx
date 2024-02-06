import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./polyfills"
import "./styles/tailwind.css"
import {assert} from "./utils/util"
import AppView from "./views/app.jsx"
import LoginView from "./views/login"
import RoomsList from "./containers/RoomsList"

const $root = document.getElementById("root")

assert($root !== null, "Root element should exist")

createRoot($root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/rooms" element={<RoomsList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
