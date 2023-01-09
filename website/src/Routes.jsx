import { Route, Routes } from "react-router-dom"
import UnderMaintenance from "./pages/UnderMaintenance"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Footer from "./pages/sections/Footer"
import Header from "./pages/sections/Header"
import Home from "./pages/Home"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/header" element={<Header />} />
        </Routes>
    )
}