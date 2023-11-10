import "./styles/index.sass"
import "./polyfills"
import Login from "./routes/Login"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import App from "./routes/App"
import {createRoot} from "react-dom/client"
import {StrictMode} from "react"
import {assert} from "./util"

export enum Path {
  App = "/",
  Login = "/login",
}

export type Credentials = {
  baseUrl: string
  accessToken: string
  userId: string
}

const $root = document.getElementById("root")

assert($root !== null, "root element should be present")

createRoot($root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={Path.App} element={<App />} />
        <Route path={Path.Login} caseSensitive element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
