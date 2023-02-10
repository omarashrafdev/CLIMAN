import { Route, Routes } from "react-router-dom"
import UnderMaintenance from "./pages/UnderMaintenance"
import Register from "./pages/public/Register"
import Home from "./pages/public/Home"
import WebsiteIndex from './layouts/Index'
import Login from "./pages/public/Login"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<WebsiteIndex />}>
                <Route index element={<Home />} />
            </Route>

            <Route path="/">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forget-password" element={<UnderMaintenance />} />
            </Route>
        </Routes>
    )
}