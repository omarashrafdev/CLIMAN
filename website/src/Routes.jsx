import { Route, Routes } from "react-router-dom"
import UnderMaintenance from "./pages/UnderMaintenance"
import Login from "./pages/public/Login"
import Register from "./pages/public/Register"
import Home from "./pages/public/Home"
import WebsiteIndex from './layouts/Index'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<WebsiteIndex />}>
                <Route index element={<Home />} />
            </Route>

            <Route path="/">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    )
}