import { Route, Routes } from "react-router-dom"
import UnderMaintenance from "./pages/UnderMaintenance"
import Login from "./pages/Login"
import Register from "./pages/Register"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<UnderMaintenance />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}