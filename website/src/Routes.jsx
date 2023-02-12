import { Route, Routes } from "react-router-dom"
import UnderMaintenance from "./pages/UnderMaintenance"
import Register from "./pages/public/Register"
import Home from "./pages/public/Home"
import WebsiteIndex from './layouts/Index'
import Login from "./pages/public/Login"
import ForgetPassword from "./pages/public/ForgetPassword"


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<WebsiteIndex />}>
                <Route index element={<Home />} />
            </Route>

            <Route path="/">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forget-password" element={<ForgetPassword />} />
            </Route>

            {// TODO: Allow only for users
            }
            <Route path="/">
                <Route path="complete-profile" element={<UnderMaintenance />} />
                <Route path="change-password" element={<UnderMaintenance />} />
            </Route>
        </Routes>
    )
}