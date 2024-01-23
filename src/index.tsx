import "./styles/global.sass"
import "./polyfills"
import {BrowserRouter, Routes} from "react-router-dom"
import {createRoot} from "react-dom/client"
import {StrictMode} from "react"
import {assert} from "./util"

const $root = document.getElementById("root")

assert($root !== null, "root element should exist")

// TODO: Add routes for the login and app pages.
createRoot($root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  </StrictMode>
)
