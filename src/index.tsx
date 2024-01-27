import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {BrowserRouter, Routes} from "react-router-dom"
import "./polyfills"
import "./styles/global.sass"
import {assert} from "./utils/util"

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
