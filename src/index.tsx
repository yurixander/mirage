import "./styles/index.sass"
import Login from "./routes/Login"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import App from "./routes/App"
import {createRoot} from 'react-dom/client'

export enum Path {
  App = "/",
  Login = "/login",
}

export type Credentials = {
  baseUrl: string
  accessToken: string
  userId: string
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path={Path.App} element={<App />} />
      <Route path={Path.Login} caseSensitive element={<Login />} />
    </Routes>
  </BrowserRouter>
)
